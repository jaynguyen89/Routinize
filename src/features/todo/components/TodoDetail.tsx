import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import md5 from 'md5';

import { Alert, ScrollView, View, ViewStyle } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, Input, Text } from 'react-native-elements';
import ActionButtons from '../../../customs/ActionButtons';
import DTPicker from '../../../customs/DTPicker';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { ACTION_TYPES, FILE_TYPES, MEDIA_TYPES } from '../../../shared/enums';
import { EMPTY_TODO, ITodoDetail } from '../redux/constants';
import ITodo from '../../../models/ITodo';

import { Typography } from '../../../shared/typography';
import { sharedStyles } from '../../../shared/styles';
import { faCheckCircle, faFileImport, faPhotoVideo, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { DATE_FORMATS, EMPTY_STRING, SPACE_MONO, TIME_FORMATS } from '../../../helpers/Constants';
import PopoverContent from '../../../customs/PopoverContent';
import Popover from 'react-native-popover-view/dist/Popover';
import { IFile, IMedia } from '../../../models/others';
import AttachmentsList from '../../../customs/AttachmentsList';
import RichTextEditor from '../../../customs/rte/RichTextEditor';
import styles from '../styles';

const mapStateToProps = (state : any) => ({
    authStatus : state.appReducer.authStatus,
    settings : state.settingsReducer.appSettings.settings,
    isPersonal : state.todoReducer.isPersonal,
    item : state.todoReducer.todoItem
});

const mapActionsToProps = {

};

const TodoDetail = (props : ITodoDetail) => {
    const [showPopover, setShowPopover] = React.useState(false);

    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [showTimePicker, setShowTimePicker] = React.useState(false);

    const [personal, setPersonal] = React.useState(true);
    const [item, setItem] = React.useState(EMPTY_TODO as ITodo);

    const [date, setDate] = React.useState(EMPTY_STRING);
    const [time, setTime] = React.useState(EMPTY_STRING);

    React.useEffect(() => {
        setPersonal((props.item && props.item.isPersonal) || !props.authStatus || props.isPersonal);
        setItem(props.item || EMPTY_TODO);
    }, [props]);

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

    const addItemAttachments = (attachment : IMedia | IFile) => {
        let attachments = item.attachments;
        if (!attachments) attachments = new Array<IMedia | IFile>();

        attachments.push(attachment);
        setItem({ ...item, attachments : attachments });
    }

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
            const fileName = md5(response.fileName) + '.' + response.fileName.split('.')[response.fileName.split('.').length - 1];

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
            const fileName = md5(file.name) + '.' + file.name.split('.')[file.name.split('.').length - 1];

            RNFS.copyFile(
                file.uri,
                RNFS.ExternalDirectoryPath + (type === 'audio' ? '/audios/' : '/files/') + fileName
                )
                .then(() => {
                    let attachment: IFile = { id : 0, name : fileName } as IFile;
                    attachment.type = type === 'audio' ? FILE_TYPES.AUDIO : FILE_TYPES.OTHERS;

                    addItemAttachments(attachment);
                })
                .catch(err => alert('Permission Required: Please enable Storage Permission to use this feature.'));
        }
    }

    const confirmAndCancel = () =>
        Alert.alert(
            "Cancel Todo",
            "Your Todo has not been saved. All details you have entered will be lost.\n\nAre you sure?",
            [
                {
                    text: "No, go back.",
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

    const confirmCreateOrUpdateTodo = () => {
        if (item.id === 0) console.log('create todo');
        else console.log('update todo')
    }

    return (
        <>
            <ScrollView style={ sharedStyles.scroller }>
                <View style={ sharedStyles.inputWrapper }>
                    <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>{ 'Todo Title' }</Text>
                    <Input placeholder='Max. 75 characters' style={[ Typography.regular ]}
                           value={ item.title || EMPTY_STRING }
                           leftIcon={ <Icon name='bookmark' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                           onChangeText={ (val : string) => handleItemDetailsChanged(val, 'title') }
                    />
                    <Text style={[ Typography.tiny, sharedStyles.charCount, props.settings.theme.black ]}>(empty)</Text>
                </View>

                <View style={ sharedStyles.inputWrapper }>
                    <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Brief Description</Text>
                    <Input placeholder='Max. 150 characters' style={[ Typography.regular ]}
                           value={ item.description }
                           leftIcon={ <Icon name='edit' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                           onChangeText={ (val : string) => handleItemDetailsChanged(val, 'description') }
                    />
                    <Text style={[ Typography.tiny, sharedStyles.charCount, props.settings.theme.black ]}>(empty)</Text>
                </View>

                <View style={ sharedStyles.inputWrapper }>
                    <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Due Date</Text>
                    <DTPicker date={ date || null } time={ time || null }
                              actions={{ dateAction : openDatePicker, timeAction : openTimePicker }} />
                </View>

                <ActionButtons actions={[
                    { name : 'Add Media', icon : faPhotoVideo, type : ACTION_TYPES.NORMAL, callback : () => setShowPopover(true) },
                    { name : 'Add File', icon : faFileImport, type : ACTION_TYPES.NORMAL, callback : () => selectFiles() }
                ]} />

                {
                    item.attachments &&
                    <View style={ sharedStyles.inputWrapper }>
                        <AttachmentsList attachments={ item.attachments }
                                         actions={{
                                             viewAttachment : () => console.log('view'),
                                             removeAttachment : () => console.log('remove')
                                         }}
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
                        <RichTextEditor
                            initialContent={ item.details }
                            updateContent={ updateDetails }
                            placeHolder='Add more details to help yourself later'
                            extraActions={ false }
                        />
                    </View>
                </View>

                <ActionButtons actions={[
                    { name : 'Cancel', icon : faTimesCircle, type : ACTION_TYPES.DANGEROUS, callback : () => confirmAndCancel() },
                    { name : 'Done', icon : faCheckCircle, type : ACTION_TYPES.NORMAL, callback : () => confirmCreateOrUpdateTodo() }
                ]} />
            </ScrollView>

            {
                showDatePicker &&
                <DateTimePicker mode='date' minimumDate={ new Date() } maximumDate={ moment((new Date()).toString()).add(15, 'y').toDate() } onChange={ handleDatePicker }
                                value={ (item.dueDate && moment(item.dueDate).toDate()) || (new Date()) }
                />
            }

            {
                showTimePicker &&
                <DateTimePicker mode='time' onChange={ handleTimePicker }
                                value={ (item.dueDate && moment(item.dueDate).toDate()) || (new Date()) }
                />
            }

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }>
                <PopoverContent
                    actions={[
                        { name : 'Take Photo', icon : 'camera', type : ACTION_TYPES.NORMAL, callback : () => openCamera('image') },
                        { name : 'Select Photos', icon : 'image-search', type : ACTION_TYPES.NORMAL, callback : () => openGallery('image') },
                        { name : 'Record Video', icon : 'video-plus', type : ACTION_TYPES.NORMAL, callback : () => openCamera('video') },
                        { name : 'Select Videos', icon : 'video-image', type : ACTION_TYPES.NORMAL, callback : () => openGallery('video') }
                    ]}
                />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(TodoDetail);
