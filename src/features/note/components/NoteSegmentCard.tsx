import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { View } from 'react-native';
import { INoteSegmentCard } from '../redux/interfaces';

import styles from '../styles';
import AttachmentsList from '../../../customs/AttachmentsList';
import { IFile, IMedia } from '../../../models/others';
import PopoverContent from '../../../customs/PopoverContent';
import { ACTION_TYPES, FILE_TYPES, MEDIA_TYPES } from '../../../shared/enums';
import Popover from 'react-native-popover-view/dist/Popover';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import md5 from 'md5';
import RNFS from 'react-native-fs';
import { EMPTY_STRING } from '../../../helpers/Constants';
import * as attachmentConstants from '../../attachments/redux/constants';
import { IRemovalStatus } from '../../attachments/redux/constants';
import { removeLocalAttachment } from '../../attachments/redux/actions';
import { getAttachmentFolder } from '../../../helpers/Helpers';
import moment from 'moment';
import { EMPTY_SEGMENT } from '../../../models/INote';
import TextArea from '../../../customs/rte/TextArea';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    atmRemoval : state.attachmentReducer.atmRemoval
});

const mapActionsToProps = {
    removeLocalAttachment
};

const NoteSegmentCard = (props : INoteSegmentCard) => {
    const [showPopover, setShowPopover] = React.useState(false);
    const [segment, setSegment] = React.useState(_.cloneDeep(EMPTY_SEGMENT));
    const [attachmentRemovalStatus, setAttachmentRemovalStatus] = React.useState({ id : -1, progress : EMPTY_STRING, segmentIndex : -1 } as IRemovalStatus);

    React.useEffect(() => {
        setSegment(props.segment);
    }, [props.segment]);

    React.useEffect(() => {
        setAttachmentRemovalStatus({ id : props.atmRemoval.removedId, progress : props.atmRemoval.action, segmentIndex : props.atmRemoval.segmentIndex } as IRemovalStatus);

        if (props.atmRemoval.action === attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS) {
            const removedAttachment = segment.attachments?.filter(attachment => attachment.id === props.atmRemoval.removedId)[0];
            const otherAttachments = segment.attachments?.filter(attachment => attachment.id !== props.atmRemoval.removedId) as Array<IMedia | IFile>;

            props.updateNoteSegment(props.segmentIndex, 'attachments', otherAttachments.length === 0 ? null : otherAttachments);

            if (removedAttachment) {
                const attachmentFolder = getAttachmentFolder(removedAttachment.type);
                if (removedAttachment.name) RNFS.unlink(RNFS.ExternalDirectoryPath + attachmentFolder + removedAttachment.name);
            }
        }
    }, [props.atmRemoval]);

    const updateContent = (content : string) => {
        props.updateNoteSegment(props.segmentIndex, 'body', content);
    }

    const handlePlace = () => {
        console.log('NoteSegmentCard - add place')
    }

    const openCamera = (task : string) => {
        setShowPopover(false);

        if (task === 'image') { //Take photo
            ImagePicker.launchCamera({
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                },
                (response: any) => saveMediaToLocalStorage(response, 'image'));
        }
        else { //Record video
            ImagePicker.launchCamera({
                    mediaType : 'video'
                },
                (response : any) => saveMediaToLocalStorage(response, 'video'));
        }
    }

    const openGallery = (task : string) => {
        setShowPopover(false);

        if (task === 'image') { //Select photo
            ImagePicker.launchImageLibrary({
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                },
                (response: any) => saveMediaToLocalStorage(response, 'image'));
        }
        else { //Select video
            ImagePicker.launchImageLibrary({
                    mediaType : 'video'
                },
                (response : any) => saveMediaToLocalStorage(response, 'video'));
        }
    }

    const selectFiles = async () => {
        setShowPopover(false);

        try {
            const files = await DocumentPicker.pickMultiple({ type : ["*/*"] });

            files.forEach(file => {
                if (file.type.indexOf('audio') !== -1) saveFileToLocalStorage(file, 'audio');
                else saveFileToLocalStorage(file, 'others');
            });
        } catch (error) {
            if (!DocumentPicker.isCancel(error))
                console.log('selectFiles: ' + error);
        }
    }

    const saveMediaToLocalStorage = (response : any, type : string) => {
        if (response.uri) {
            const fileName = md5(response.fileName) + moment().unix() + '.' + response.fileName.split('.')[response.fileName.split('.').length - 1];

            RNFS.copyFile(
                response.uri,
                RNFS.ExternalDirectoryPath + (type === 'image' ? '/images/' : '/videos/') + fileName
            )
                .then(() => {
                    let media: IMedia = { id : 0, name : fileName } as IMedia;
                    media.type = type === 'image' ? MEDIA_TYPES.PHOTO : MEDIA_TYPES.VIDEO;

                    props.updateNoteSegment(props.segmentIndex, 'attachments', media);
                })
                .catch(err => alert('Permission Required: Please enable Storage Permission to use this feature.'));
        }
    }

    const saveFileToLocalStorage = (file : any, type : string) => {
        if (file.uri) {
            const fileName = md5(file.name) + moment().unix() + '.' + file.name.split('.')[file.name.split('.').length - 1];

            RNFS.copyFile(
                file.uri,
                RNFS.ExternalDirectoryPath + (type === 'audio' ? '/audios/' : '/files/') + fileName
            )
                .then(() => {
                    let attachment : IMedia | IFile;
                    if (type === 'audio') attachment = { id : 0, name : fileName, type : MEDIA_TYPES.AUDIO } as IMedia;
                    else attachment = { id : 0, name : fileName, type : FILE_TYPES.OTHERS } as IFile;

                    props.updateNoteSegment(props.segmentIndex, 'attachments', attachment);
                })
                .catch(err => alert('Permission Required: Please enable Storage Permission to use this feature.'));
        }
    }

    return (
        <>
            <View style={ styles.segmentWrapper }>
                <View style={[ { flex : 1 }, props.settings.theme.backgroundSecondary ]}>
                    <TextArea
                        getContent={ updateContent }
                        initialContent={ segment.body }
                        placeHolder='Note content.'
                        withButtons={ true }
                        buttonsVertical={ true }
                        actions={[
                            { callback : () => setShowPopover(true), type : ACTION_TYPES.NORMAL },
                            { callback : () => handlePlace(), type : ACTION_TYPES.NORMAL },
                            { callback : () => props.removeSegment(props.segmentIndex), type : ACTION_TYPES.DANGEROUS }
                        ]}
                    />
                    {/*<RichTextEditor key={ props.segmentIndex }*/}
                    {/*    id={ props.segmentIndex }*/}
                    {/*    initialContent={ segment.body }*/}
                    {/*    updateContent={ updateContent }*/}
                    {/*    placeHolder='Note content'*/}
                    {/*    extraActions={ true }*/}
                    {/*    removeSegment={ props.removeSegment }*/}
                    {/*    handleAttachmentAdding={ () => setShowPopover(true) }*/}
                    {/*    handlePlaceAdding={ handlePlace }*/}
                    {/*/>*/}
                </View>

                {
                    segment && segment.attachments &&
                    <View style={ styles.attachmentWrapper }>
                        <AttachmentsList attachments={ segment.attachments }
                                         actions={{
                                             viewAttachment : () => console.log('view'),
                                             removeAttachment : props.removeLocalAttachment
                                         }}
                                         removal={ attachmentRemovalStatus }
                                         segmentIndex={ props.segmentIndex }
                        />
                    </View>
                }
            </View>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }>
                <PopoverContent
                    actions={[
                        { name : 'Take Photo', icon : 'camera', type : ACTION_TYPES.NORMAL, callback : () => openCamera('image') },
                        { name : 'Select Photos', icon : 'image-search', type : ACTION_TYPES.NORMAL, callback : () => openGallery('image') },
                        { name : 'Record Video', icon : 'video-plus', type : ACTION_TYPES.NORMAL, callback : () => openCamera('video') },
                        // { name : 'Select Videos', icon : 'video-image', type : ACTION_TYPES.NORMAL, callback : () => openGallery('video') },
                        { name : 'Select Files', icon : 'file-plus', type : ACTION_TYPES.NORMAL, callback : () => selectFiles() }
                    ]}
                />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(NoteSegmentCard);
