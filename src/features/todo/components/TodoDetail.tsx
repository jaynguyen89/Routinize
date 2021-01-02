import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import md5 from 'md5';
import RNFS from 'react-native-fs';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

import { Alert, ScrollView, View, ViewStyle } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, Input, Text } from 'react-native-elements';
import ScreenCover from '../../../customs/ScreenCover';
import Loading from '../../../customs/Loading';
import ActionButtons from '../../../customs/ActionButtons';
import DTPicker from '../../../customs/DTPicker';
import {
    ACTION_TYPES,
    ACTIONS,
    FILE_TYPES,
    MEDIA_TYPES,
    MOMENT_FORMATS
} from '../../../shared/enums';
import { ITodoDetail } from '../redux/constants';
import ITodo, { EMPTY_TODO } from '../../../models/ITodo';
import * as attachmentConstants from '../../attachments/redux/constants';
import { IRemovalStatus } from '../../attachments/redux/constants';

import { Typography } from '../../../shared/typography';
import { sharedStyles } from '../../../shared/styles';
import { faCheckCircle, faFileImport, faLink, faPhotoVideo, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { DATE_FORMATS, EMPTY_STRING, SPACE_MONO, TIME_FORMATS } from '../../../helpers/Constants';
import PopoverContent from '../../../customs/PopoverContent';
import Popover from 'react-native-popover-view/dist/Popover';
import { IFile, IMedia } from '../../../models/others';
import styles from '../styles';

import { createLocalTodo, getLocalTodoAttachments, updateLocalTodo, markLocalTodoAsDoneWithDate } from '../redux/actions';
import * as todoConstants from '../redux/constants';
import { removeLocalAttachment } from '../../attachments/redux/actions';
import { getAttachmentFolder } from '../../../helpers/Helpers';
import AttachmentsList from '../../../customs/AttachmentsList';
import UrlAttacher from '../../../customs/UrlAttacher';
import TextArea from '../../../customs/rte/TextArea';
import { isObjectContentChanged } from '../../../helpers/Assistant';
import { DB_TIMESTAMP_FORMAT } from '../../../providers/databaseReader';
import FlatDTPicker from '../../../customs/FlatDTPicker';

const mapStateToProps = (state : any) => ({
    authStatus : state.appReducer.authStatus,
    settings : state.settingsReducer.appSettings.settings,
    isPersonal : state.todoReducer.isPersonal,
    item : state.todoReducer.todoItem,
    newItem : state.todoReducer.newItem,
    updateItem : state.todoReducer.updateItem,
    getAttachments : state.todoReducer.getAttachments,
    atmRemoval : state.attachmentReducer.atmRemoval,
    setDoneWithDate : state.todoReducer.setDoneWithDate
});

const mapActionsToProps = {
    createLocalTodo,
    updateLocalTodo,
    getLocalTodoAttachments,
    removeLocalAttachment,
    markLocalTodoAsDoneWithDate
};

const TodoDetail = (props : ITodoDetail) => {
    const [action, setAction] = React.useState(ACTIONS.NONE);
    const [screenCover, setScreenCover] = React.useState({ message : EMPTY_STRING, visible : false });
    const [showPopover, setShowPopover] = React.useState(false);
    const [showUrlPopover, setShowUrlPopover] = React.useState(false);
    const [showDoneDatePopover, setShowDoneDatePopover] = React.useState(false);

    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [showTimePicker, setShowTimePicker] = React.useState(false);

    const [personal, setPersonal] = React.useState(true);
    const [item, setItem] = React.useState(_.cloneDeep(EMPTY_TODO) as ITodo);
    const [itemBackup, setItemBackup] = React.useState(_.cloneDeep(EMPTY_TODO) as ITodo);
    const [attachmentRemovalStatus, setAttachmentRemovalStatus] = React.useState({ id : -1, progress : EMPTY_STRING } as IRemovalStatus);

    const [date, setDate] = React.useState(EMPTY_STRING);
    const [time, setTime] = React.useState(EMPTY_STRING);

    React.useEffect(() => {
        setPersonal((props.item && props.item.isPersonal) || !props.authStatus || props.isPersonal);

        if (props.item) {
            props.getLocalTodoAttachments(props.item.id);

            setDate((
                props.item &&
                moment(
                    props.item.dueDate,
                    MOMENT_FORMATS.DMY
                ).format(DATE_FORMATS[props.settings.dateTimeFormat])
            ) || EMPTY_STRING);

            setTime((
                props.item &&
                moment(
                    props.item.dueDate,
                    `${ MOMENT_FORMATS.DMY } ${ MOMENT_FORMATS.HM }`
                ).format(TIME_FORMATS[props.settings.dateTimeFormat])
            ) || EMPTY_STRING);
        }
    }, [props.item]);

    React.useEffect(() => {
        setScreenCover({ message : EMPTY_STRING, visible : false });

        if (action === ACTIONS.CREATE)
            Alert.alert(
                props.newItem.addingSuccess ? 'Success!' : 'Todo saving failed!',
                props.newItem.addingSuccess ? 'Your Todo has been saved.' : 'An issue happened while saving your Todo. Please try again.',
                [{
                    text: 'OK',
                    onPress: () => {
                        setAction(ACTIONS.NONE);
                        if (props.newItem.addingSuccess) props.navigation.goBack();
                    }
                }],
                { cancelable: false }
            );
    }, [props.newItem]);

    React.useEffect(() => {
        if (!props.getAttachments.isRetrieving && props.getAttachments.retrievingSuccess) {
            setItem({ ...props.item, attachments: props.getAttachments.attachments });
            setItemBackup({ ...props.item, attachments : props.getAttachments.attachments });
        }
    }, [props.getAttachments]);

    React.useEffect(() => {
        setScreenCover({ message : EMPTY_STRING, visible : false });

        if (action === ACTIONS.UPDATE && typeof props.updateItem.updateResult === 'number' && props.updateItem.updateResult > 0)
            Alert.alert(
                'Success!', 'Your Todo has been updated.',
                [{
                    text: 'OK',
                    onPress: () => {
                        setAction(ACTIONS.NONE);
                        props.navigation.goBack();
                    }
                }],
                { cancelable: false }
            );

        if (action === ACTIONS.UPDATE && !props.updateItem.isUpdating)
            Alert.alert(
                typeof props.updateItem.updateResult === 'number'
                    ? (props.updateItem.updateResult > 0 ? 'Success!' : 'Issue while updating!')
                    : 'Todo updating failed!',
                typeof props.updateItem.updateResult === 'number'
                    ? (
                        props.updateItem.updateResult > 0
                            ? 'Your Todo has been updated.'
                            : 'The details of your Todo have been updated. But the attachments you have just added were failed to save. Please check your attachments.'
                    ) : 'A problem occurred while saving changes. Please try again.',
                [{
                    text: 'OK',
                    onPress: () => {
                        setAction(ACTIONS.NONE);
                        if (typeof props.updateItem.updateResult === 'number' && props.updateItem.updateResult > 0) props.navigation.goBack();
                    }
                }],
                { cancelable: false }
            );
    }, [props.updateItem]);

    React.useEffect(() => {
        setAttachmentRemovalStatus({ id : props.atmRemoval.removedId, progress : props.atmRemoval.action } as IRemovalStatus);

        if (props.atmRemoval.action === attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS) {
            const removedAttachment = item.attachments?.filter(attachment => attachment.id === props.atmRemoval.removedId)[0];
            const otherAttachments = item.attachments?.filter(attachment => attachment.id !== props.atmRemoval.removedId) as Array<IMedia | IFile>;

            setItem({ ...item, attachments : otherAttachments.length === 0 ? null : otherAttachments });

            if (removedAttachment) {
                const attachmentFolder = getAttachmentFolder(removedAttachment.type);
                if (removedAttachment.name) RNFS.unlink(RNFS.ExternalDirectoryPath + attachmentFolder + removedAttachment.name);
            }
        }
    }, [props.atmRemoval]);

    React.useEffect(() => {
        if (props.setDoneWithDate.action === todoConstants.MARK_LOCAL_TODO_AS_DONE_WITH_DATE_FAILED)
            alert('Failed! An issue happened while marking Todo as Done. Please try again.');

        if (props.setDoneWithDate.action === todoConstants.MARK_LOCAL_TODO_AS_DONE_WITH_DATE_SUCCESS)
            Alert.alert(
                "Success!",
                "Your Todo has been marked as Done.",
                [{
                    text: 'OK',
                    onPress: () => props.navigation.goBack()
                }],
                { cancelable: false }
            );
    }, [props.setDoneWithDate]);

    React.useEffect(() => {
        if (date && time) {
            let dateVal = date + SPACE_MONO + time;
            setItem({ ...item, dueDate : dateVal });
        }
    }, [date, time]);

    const updateDetails = (content : string) => {
        setItem({ ...item, details : content });
    }

    const handleItemDetailsChanged = (value : string, field : string) => {
        if (field === 'title') setItem({ ...item, title : value });
        if (field === 'description') setItem({ ...item, description : value });
    }

    const addItemAttachments = (attachment: IMedia | IFile) => {
        let attachments = item.attachments;
        if (!attachments) attachments = new Array<IMedia | IFile>();

        attachments.push(attachment);
        setItem({ ...item, attachments });
    };

    const handleDatePicker = (event : any, date : any) => {
        if (date != undefined) setDate(moment(date).format(DATE_FORMATS[props.settings.dateTimeFormat]));
        setShowDatePicker(false);
    }

    const handleTimePicker = (event : any, time : any) => {
        if (time != undefined) setTime(moment(time).format(TIME_FORMATS[props.settings.dateTimeFormat]));
        setShowTimePicker(false);
    }

    const openDatePicker = (e : any) => setShowDatePicker(true)
    const openTimePicker = (e : any) => setShowTimePicker(true);

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

                    addItemAttachments(media);
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

                    addItemAttachments(attachment);
                })
                .catch(err => alert('Permission Required: Please enable Storage Permission to use this feature.'));
        }
    }

    const updateUrl = (url : any) => {
        setShowUrlPopover(false);
        if (url.type <= 2) {
            const media = { type : url.type, url : url.value } as IMedia;
            addItemAttachments(media);
            return;
        }

        const file = { type : url.type, url : url.value } as IFile;
        addItemAttachments(file);
    }

    const markDoneWithDate = (date : string) => {
        setShowDoneDatePopover(false);
        props.markLocalTodoAsDoneWithDate(item.id, date);
    }

    const confirmAndCancel = () => {
        const hasChanges = isObjectContentChanged(_.cloneDeep(item), _.cloneDeep(itemBackup));

        if (hasChanges)
            Alert.alert(
                "Cancel Todo",
                "Your Todo has not been saved. All details you have entered will be lost.\n\nAre you sure?",
                [
                    {
                        text: "No, back to my Todo.",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: 'Yes, I\'m sure.',
                        onPress: () => props.navigation.goBack()
                    }
                ],
                { cancelable: false }
            );
        else
            props.navigation.goBack();
    }

    const confirmCreateOrUpdateTodo = () => {
        const hasChanges = isObjectContentChanged(_.cloneDeep(item), _.cloneDeep(itemBackup));
        if (!hasChanges) {
            alert('No changes was made to the content.');
            return;
        }

        if (item.id === 0) {
            setScreenCover({ message : 'Saving changes', visible : true });
            props.createLocalTodo(item);
            setAction(ACTIONS.CREATE);
        }
        else {
            setScreenCover({ message : 'Updating changes', visible : true });
            props.updateLocalTodo(item);
            setAction(ACTIONS.UPDATE);
        }
    }

    return (
        <>
            <ScrollView style={ sharedStyles.scroller }>
                <View style={ sharedStyles.inputWrapper }>
                    <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>{ 'Todo Title' }</Text>
                    <Input placeholder='Title' style={[ Typography.regular ]}
                           value={ item.title || EMPTY_STRING }
                           leftIcon={ <Icon name='bookmark' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                           onChangeText={ (val : string) => handleItemDetailsChanged(val, 'title') }
                    />
                </View>

                <View style={ sharedStyles.inputWrapper }>
                    <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Brief Description</Text>
                    <Input placeholder='Briefly tell what to do' style={[ Typography.regular ]}
                           value={ item.description }
                           leftIcon={ <Icon name='edit' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                           onChangeText={ (val : string) => handleItemDetailsChanged(val, 'description') }
                    />
                </View>

                <View style={ sharedStyles.inputWrapper }>
                    <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Due Date</Text>
                    <DTPicker date={ date || null } time={ time || null }
                              actions={{ dateAction : openDatePicker, timeAction : openTimePicker }} />
                </View>

                <View style={ sharedStyles.inputWrapper }>
                    <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Attachments</Text>
                    <ActionButtons actions={[
                        { name : 'Media', icon : faPhotoVideo, type : ACTION_TYPES.NORMAL, callback : () => setShowPopover(true) },
                        { name : 'File', icon : faFileImport, type : ACTION_TYPES.NORMAL, callback : () => selectFiles() },
                        { name : 'URL', icon : faLink, type : ACTION_TYPES.NORMAL, callback : () => setShowUrlPopover(true) }
                    ]} />

                    { props.getAttachments.isRetrieving && <Loading message='Finding attachments.' /> }
                    {
                        !props.getAttachments.isRetrieving && !props.getAttachments.retrievingSuccess && props.getAttachments.attachments &&
                        <View style={ sharedStyles.inputWrapper }>
                          <Text style={[ Typography.small, { textAlign : 'center', color : sharedStyles.btnDanger.backgroundColor } ]}>
                            An issue happened while looking for the attachments. Please refresh the screen to retry.
                          </Text>
                        </View>
                    }
                </View>

                {
                    item.attachments &&
                    <View style={ sharedStyles.inputWrapper }>
                        <AttachmentsList attachments={ item.attachments }
                                       actions={{
                                           viewAttachment : () => console.log('view'),
                                           removeAttachment : props.removeLocalAttachment
                                       }}
                                       removal={ attachmentRemovalStatus }
                        />
                    </View>
                }

                {
                    !personal &&
                    <View style={sharedStyles.inputWrapper}>
                        <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Share To</Text>
                        <Input placeholder='Name of Collaborator to search' style={[Typography.regular, { flex: 1 }]}
                               leftIcon={<Icon name='people' size={24}
                                               color={props.settings.theme.invert.backgroundColor} />}
                               rightIcon={<Icon name='person-search' size={18}
                                                color={props.settings.theme.textFill.color}
                                                style={[props.settings.theme.btnPrimary, sharedStyles.inputFieldBtn] as ViewStyle}
                               />}
                        />
                    </View>
                }

                <View style={ sharedStyles.inputWrapper }>
                    <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Places</Text>
                    <Input placeholder='Address or Place Name' style={[ Typography.regular, { flex : 1 } ]}
                           leftIcon={ <Icon name='map' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                           rightIcon={ <Icon name='maps-ugc' size={ 18 }
                                             color={ props.settings.theme.textFill.color }
                                             style={[ props.settings.theme.btnPrimary, sharedStyles.inputFieldBtn ] as ViewStyle }
                           /> }
                    />
                </View>



                <View style={ styles.editorWrapper }>
                    <View style={[ { flex : 1 }, props.settings.theme.backgroundSecondary ]}>
                        <TextArea
                            getContent={ updateDetails }
                            initialContent={ item.details || EMPTY_STRING }
                            placeHolder='Add more details to help yourself later.'
                        />
                        {/*<RichTextEditor*/}
                        {/*    initialContent={ item.details || EMPTY_STRING }*/}
                        {/*    updateContent={ updateDetails }*/}
                        {/*    placeHolder='Add more details to help yourself later'*/}
                        {/*    extraActions={ false }*/}
                        {/*/>*/}
                    </View>
                </View>
            </ScrollView>

            <ActionButtons actions={[
                { name : 'Mark As Done', icon : faTimesCircle, type : ACTION_TYPES.CAUTIOUS, callback : () => setShowDoneDatePopover(true) },
                { name : item.id === 0 ? 'Save' : 'Update', icon : faCheckCircle, type : ACTION_TYPES.NORMAL, callback : () => confirmCreateOrUpdateTodo() }
            ]} />

            {
                showDatePicker &&
                <DateTimePicker mode='date' minimumDate={ new Date() } maximumDate={ moment((new Date()).toString()).add(15, 'y').toDate() } onChange={ handleDatePicker }
                                value={ (item.dueDate && moment(item.dueDate, DB_TIMESTAMP_FORMAT).toDate()) || (new Date()) }
                />
            }

            {
                showTimePicker &&
                <DateTimePicker mode='time' onChange={ handleTimePicker }
                                value={ (item.dueDate && moment(item.dueDate, DB_TIMESTAMP_FORMAT).toDate()) || (new Date()) }
                />
            }

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }>
                <PopoverContent
                    actions={[
                        { name : 'Take Photo', icon : 'camera', type : ACTION_TYPES.NORMAL, callback : () => openCamera('image') },
                        { name : 'Select Photos', icon : 'image-search', type : ACTION_TYPES.NORMAL, callback : () => openGallery('image') },
                        { name : 'Record Video', icon : 'video-plus', type : ACTION_TYPES.NORMAL, callback : () => openCamera('video') },
                        // { name : 'Select Videos', icon : 'video-image', type : ACTION_TYPES.NORMAL, callback : () => openGallery('video') }
                    ]}
                />
            </Popover>

            <Popover isVisible={ showUrlPopover } onRequestClose={ () => setShowUrlPopover(false) }>
                <UrlAttacher getUrl={ updateUrl } />
            </Popover>

            <Popover isVisible={ showDoneDatePopover } onRequestClose={ () => setShowDoneDatePopover(false) }>
                <FlatDTPicker
                    title='Set a Done Date'
                    values={{
                        minDate : moment(item.createdOn, DB_TIMESTAMP_FORMAT).toDate(),
                        maxDate : new Date(),
                        default : new Date()
                    }}
                    callback={ markDoneWithDate }
                />
            </Popover>

            <ScreenCover message={ screenCover.message } visible={ screenCover.visible } />
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(TodoDetail);
