import React from 'react';
import { connect } from 'react-redux';

import styles from './styles';
import Popover from 'react-native-popover-view/dist/Popover';
import Loading from './Loading';
import { ActivityIndicator } from 'react-native-paper';
import { BASE_HEIGHT, Typography } from '../shared/typography';
import { Text, View } from 'react-native';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const ScreenCover = (props : { settings? : any, visible : boolean, message : string }) => {
    return (
        <Popover isVisible={ props.visible } popoverStyle={{ paddingBottom : BASE_HEIGHT * 15, borderWidth : 0, backgroundColor : 'rgba(0, 0, 0, 0)' }}>
            <View style={{ flex : 1, justifyContent : 'center' }}>
                <ActivityIndicator
                    animating={ true }
                    color={ props.settings.theme.textFill.color }
                    size={ BASE_HEIGHT * 2.5 }
                    style={{ justifyContent : 'center', marginTop : BASE_HEIGHT * 5, marginBottom : BASE_HEIGHT }}
                />
                <Text style={[ Typography.thirdHeader, { textAlign : 'center', color : props.settings.theme.textFill.color } ]}>{ props.message }</Text>
            </View>
        </Popover>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ScreenCover);