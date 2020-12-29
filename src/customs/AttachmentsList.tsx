import React from 'react';
import { connect } from 'react-redux';

import styles from './styles';
import { FlatList, Image, View, Text } from 'react-native';
import { IAttachmentsList } from '../shared/interfaces';
import RNFS from 'react-native-fs';
import { BASE_HEIGHT, baseFontSize, Typography } from "../shared/typography";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { sharedStyles } from '../shared/styles';
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import { FILE_TYPES, MEDIA_TYPES } from '../shared/enums';
import { IFile, IMedia } from '../models/others';
import { generateRandomString } from '../helpers/Helpers';
import { SPACE_MONO } from '../helpers/Constants';
import * as attachmentConstants from '../features/attachments/redux/constants';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const AttachmentsList = (props: IAttachmentsList) => {
    return (
        <>
            <View style={{ margin : 0, flexDirection : 'row' }}>
                <FlatList data={ props.attachments } keyExtractor={ (item : IMedia | IFile) => item.name || generateRandomString() as string } horizontal={ true }
                    renderItem={ ({ item }) =>
                        <View style={{ margin : 5 }}>
                            <TouchableRipple style={ styles.imageWrapper } rippleColor={ props.settings.theme.btnPrimary.backgroundColor } onPress={ () => props.actions.viewAttachment(item.id) }>
                                <View style={{ margin : 0 }}>
                                    {
                                        (
                                            item.name && (item.type === MEDIA_TYPES.PHOTO || item.type === MEDIA_TYPES.VIDEO) &&
                                            <Image source={{
                                                        uri : 'file://' + RNFS.ExternalDirectoryPath + (item.type === MEDIA_TYPES.PHOTO ? '/images/' : '/videos/') + item.name
                                                   }}
                                                   style={ styles.imageThumb }
                                            />
                                        ) || (
                                            (item.name &&
                                              <Image source={ require('../../assets/file_attachment.png') } style={{ width : BASE_HEIGHT * 3, height : BASE_HEIGHT * 4, resizeMode : 'stretch' }} />
                                            ) ||
                                            <Image source={ require('../../assets/url_attachment.png') } style={{ width : BASE_HEIGHT * 3, height : BASE_HEIGHT * 4, resizeMode : 'stretch' }} />
                                        )
                                    }

                                    <Text style={[ styles.fileType, Typography.regular, { fontWeight : 'bold' } ]}>
                                        {
                                            (
                                                item.name && item.name.split('.')[1]
                                            ) || (
                                                (item.type <= 2 && MEDIA_TYPES[item.type]) || FILE_TYPES[item.type]
                                            )
                                        }
                                    </Text>
                                </View>
                            </TouchableRipple>

                            <TouchableRipple style={ styles.iconTouchable } rippleColor={ sharedStyles.btnDanger.backgroundColor } onPress={ () => props.actions.removeAttachment(item.id) }>
                                <FontAwesomeIcon icon={ faTimes } size={ baseFontSize * 1.8 }
                                                 style={ styles.iconThumb } color={ sharedStyles.btnDanger.backgroundColor } />
                            </TouchableRipple>

                            {
                                item.id !== 0 && item.id === props.removal.id &&
                                <ActivityIndicator color={ props.settings.theme.backgroundPrimary.color }
                                                   size={ baseFontSize * 2 }
                                                   style={ styles.actionMarkerIcon }
                                />
                            }
                        </View>
                    } />
            </View>

            {
                props.removal.progress === attachmentConstants.REMOVE_LOCAL_ATTACHMENT &&
                <Text style={[
                    {
                        textAlign: 'center',
                        color: props.settings.theme.backgroundPrimary.backgroundColor
                    }, Typography.tiny
                ]}>
                    <ActivityIndicator size={12.5}
                                       color={ props.settings.theme.backgroundPrimary.backgroundColor } />
                    { SPACE_MONO + 'Removing attachment...' }
                </Text>
            }

            {
                props.removal.progress === attachmentConstants.REMOVE_LOCAL_ATTACHMENT_FAILED &&
                <Text style={[
                    {
                        textAlign: 'center',
                        color: sharedStyles.btnDanger.backgroundColor
                    }, Typography.tiny
                ]}>
                    <ActivityIndicator size={ 12.5 } color={ sharedStyles.btnDanger.backgroundColor } />
                    { SPACE_MONO + 'Attachment removal failed.' }
                </Text>
            }

            {
                props.removal.progress === attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS &&
                <Text style={[
                    {
                        textAlign: 'center',
                        color: sharedStyles.btnSuccess.backgroundColor
                    }, Typography.tiny
                ]}>Attachment has been removed.</Text>
            }
        </>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(AttachmentsList);