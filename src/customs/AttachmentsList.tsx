import React from 'react';
import { connect } from 'react-redux';

import styles from './styles';
import { FlatList, Image, View, Text } from 'react-native';
import { IAttachmentsList } from '../shared/interfaces';
import RNFS from 'react-native-fs';
import { BASE_HEIGHT, baseFontSize, Typography } from "../shared/typography";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBan, faTimes } from '@fortawesome/free-solid-svg-icons';
import { sharedStyles } from '../shared/styles';
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import { MEDIA_TYPES } from '../shared/enums';
import { IFile, IMedia } from '../models/others';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const AttachmentsList = (props: IAttachmentsList) => {
    return (
        <View style={{ margin : 0, flexDirection : 'row' }}>
            <FlatList data={ props.attachments } keyExtractor={ (item : IMedia | IFile) => item.name as string } horizontal={ true }
                renderItem={ ({ item }) =>
                    <View style={{ margin : 5 }}>
                        <TouchableRipple style={ styles.imageWrapper } rippleColor={ props.settings.theme.btnPrimary.backgroundColor } onPress={ () => props.actions.viewAttachment(item.id) }>
                            <View style={{ margin : 0 }}>
                                {
                                    (
                                        (item.type === MEDIA_TYPES.PHOTO || item.type === MEDIA_TYPES.VIDEO) &&
                                        <Image source={{
                                                    uri : 'file://' + RNFS.ExternalDirectoryPath + (item.type === MEDIA_TYPES.PHOTO ? '/images/' : '/videos/') + item.name
                                               }}
                                               style={ styles.imageThumb }
                                        />
                                    ) ||
                                    <Image source={ require('../../assets/file_attachment.png') } style={{ width : BASE_HEIGHT * 3, height : BASE_HEIGHT * 4, resizeMode : 'stretch' }} />
                                }

                                <Text style={[ styles.fileType, Typography.fourthHeader, { fontWeight : 'bold' } ]}>{ item.name?.split('.')[1] }</Text>
                            </View>
                        </TouchableRipple>

                        <TouchableRipple style={ styles.iconTouchable } rippleColor={ sharedStyles.btnDanger.backgroundColor } onPress={ () => props.actions.removeAttachment(item.id) }>
                            <FontAwesomeIcon icon={ faTimes } size={ baseFontSize * 1.8 }
                                             style={ styles.iconThumb } color={ sharedStyles.btnDanger.backgroundColor } />
                        </TouchableRipple>

                        {
                            item.id === props.removal &&
                            <ActivityIndicator color={props.settings.theme.backgroundPrimary.color}
                                               size={baseFontSize * 2}
                                               style={styles.actionMarkerIcon}
                            />
                        }
                    </View>
                } />
        </View>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(AttachmentsList);