import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { View } from 'react-native';
import { INoteSegmentCard } from '../redux/constants';
import RichTextEditor from '../../../customs/rte/RichTextEditor';

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
import { EMPTY_STRING, SPACE_MONO } from '../../../helpers/Constants';
import { IRemovalStatus } from '../../attachments/redux/constants';
import { sharedStyles } from '../../../shared/styles';
import { Text } from 'react-native-elements';
import { Typography } from '../../../shared/typography';
import { removeLocalAttachment } from '../../attachments/redux/actions';
import { ActivityIndicator } from 'react-native-paper';
import * as attachmentConstants from '../../attachments/redux/constants';
import { getAttachmentFolder } from '../../../helpers/Helpers';
import moment from 'moment';
import { EMPTY_SEGMENT } from '../../../models/INote';

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
    const [attachmentRemovalStatus, setAttachmentRemovalStatus] = React.useState({ id : -1, progress : EMPTY_STRING } as IRemovalStatus);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
        isMounted && setSegment(props.segment);

        return () => setIsMounted(false);
    }, [props.segment]);

    React.useEffect(() => {
        if (props.atmRemoval.action === attachmentConstants.REMOVE_LOCAL_ATTACHMENT) {
            setAttachmentRemovalStatus({ id : props.atmRemoval.removedId, progress : null } as IRemovalStatus);
            return;
        }

        if (props.atmRemoval.action === attachmentConstants.REMOVE_LOCAL_ATTACHMENT_FAILED) {
            setAttachmentRemovalStatus({ id : props.atmRemoval.removedId, progress : props.atmRemoval.removedId } as IRemovalStatus);
            return;
        }

        if (
            props.atmRemoval.action === attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS &&
            typeof props.atmRemoval.removedId === 'number'
        ) {
            setAttachmentRemovalStatus({ id : props.atmRemoval.removedId, progress : true });
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
                    <RichTextEditor key={ props.segmentIndex }
                        id={ props.segmentIndex }
                        initialContent={ segment.body }
                        updateContent={ updateContent }
                        placeHolder='Note content'
                        extraActions={ true }
                        removeSegment={ props.removeSegment }
                        handleAttachmentAdding={ () => setShowPopover(true) }
                        handlePlaceAdding={ handlePlace }
                    />
                </View>

                {
                    segment && segment.attachments &&
                    <View style={ sharedStyles.inputWrapper }>
                        <AttachmentsList attachments={ segment.attachments }
                                       actions={{
                                           viewAttachment : () => console.log('view'),
                                           removeAttachment : props.removeLocalAttachment
                                       }}
                                       removal={ attachmentRemovalStatus.id }
                        />

                        {
                            typeof attachmentRemovalStatus.progress !== 'string' &&
                            <Text style={[
                                {
                                    textAlign: 'center',
                                    color: (
                                        typeof attachmentRemovalStatus.progress === 'object' &&
                                        attachmentRemovalStatus.progress != null && sharedStyles.btnDanger.backgroundColor
                                    ) || sharedStyles.btnSuccess.backgroundColor
                                }, Typography.tiny
                            ]}>
                                {
                                    attachmentRemovalStatus.progress == null &&
                                    <>
                                      <ActivityIndicator size={ 12.5 }
                                                         color={ props.settings.theme.backgroundPrimary.backgroundColor } />
                                        { SPACE_MONO + 'Removing attachment...' }
                                    </>
                                }

                                {
                                    typeof attachmentRemovalStatus.progress === 'object' && attachmentRemovalStatus.progress != null &&
                                    <>
                                      <ActivityIndicator size={12.5} color={sharedStyles.btnDanger.backgroundColor} />
                                        { SPACE_MONO + 'Attachment removal failed.' }
                                    </>
                                }

                                {
                                    typeof attachmentRemovalStatus.progress === 'boolean' && attachmentRemovalStatus.progress &&
                                    <>{ 'Attachment has been removed.' }</>
                                }
                            </Text>
                        }
                    </View>
                }
            </View>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }>
                <PopoverContent
                    actions={[
                        { name : 'Take Photo', icon : 'camera', type : ACTION_TYPES.NORMAL, callback : () => openCamera('image') },
                        { name : 'Select Photos', icon : 'image-search', type : ACTION_TYPES.NORMAL, callback : () => openGallery('image') },
                        { name : 'Record Video', icon : 'video-plus', type : ACTION_TYPES.NORMAL, callback : () => openCamera('video') },
                        { name : 'Select Videos', icon : 'video-image', type : ACTION_TYPES.NORMAL, callback : () => openGallery('video') },
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
