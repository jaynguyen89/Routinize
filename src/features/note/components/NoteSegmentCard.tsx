import React from 'react';
import { connect } from 'react-redux';

import { View } from 'react-native';
import { EMPTY_SEGMENT, INoteSegmentCard } from '../redux/constants';
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

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const NoteSegmentCard = (props : INoteSegmentCard) => {
    const [showPopover, setShowPopover] = React.useState(false);
    const [segment, setSegment] = React.useState(EMPTY_SEGMENT);

    React.useEffect(() => {
        setSegment(props.segment);
    }, [props.segment]);

    const updateContent = (content : string) => {
        setSegment({ ...segment, body : content });
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
            const fileName = md5(response.fileName) + '.' + response.fileName.split('.')[response.fileName.split('.').length - 1];

            RNFS.copyFile(
                response.uri,
                RNFS.ExternalDirectoryPath + (type === 'image' ? '/images/' : '/videos/') + fileName
            )
                .then(() => {
                    let media: IMedia = { id : 0, name : fileName } as IMedia;
                    media.type = type === 'image' ? MEDIA_TYPES.PHOTO : MEDIA_TYPES.VIDEO;

                    addSegmentAttachment(media);
                })
                .catch(err => alert('Permission Required: Please enable Storage Permission to use this feature.'));
        }
    }

    const saveFileToLocalStorage = (file : any, type : string) => {
        if (file.uri) {
            const fileName = md5(file.name) + '.' + file.name.split('.')[file.name.split('.').length - 1];

            RNFS.copyFile(
                file.uri,
                RNFS.ExternalDirectoryPath + (type === 'audio' ? '/audios/' : '/files/') + fileName
            )
                .then(() => {
                    let attachment: IFile = { id : 0, name : fileName } as IFile;
                    attachment.type = type === 'audio' ? FILE_TYPES.AUDIO : FILE_TYPES.OTHERS;

                    addSegmentAttachment(attachment);
                })
                .catch(err => alert('Permission Required: Please enable Storage Permission to use this feature.'));
        }
    }

    const addSegmentAttachment = (attachment : IMedia | IFile) => {
        let attachments = segment.attachments;
        if (!attachments) attachments = new Array<IMedia | IFile>();

        attachments.push(attachment);console.log('attachment length = ' + attachments.length)
        setSegment({ ...segment, attachments : attachments });
    }

    return (
        <>
            <View style={ styles.segmentWrapper }>
                <View style={[ { flex : 1 }, props.settings.theme.backgroundSecondary ]}>
                    <RichTextEditor
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
                    segment && (segment.attachments || segment.places) &&
                    <View style={[styles.attachmentWrapper, props.settings.theme.backgroundSecondary, props.settings.theme.border]}>
                        <AttachmentsList
                            attachments={ segment.attachments || Array<IMedia | IFile>() }
                            actions={{
                                viewAttachment: () => console.log('view'),
                                removeAttachment: () => console.log('remove')
                            }}
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
                        { name : 'Select Videos', icon : 'video-image', type : ACTION_TYPES.NORMAL, callback : () => openGallery('video') },
                        { name : 'Select Files', icon : 'file-plus', type : ACTION_TYPES.NORMAL, callback : () => selectFiles() }
                    ]}
                />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps
)(NoteSegmentCard);
