import React from 'react';
import { connect } from 'react-redux';

import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { BASE_HEIGHT, Typography } from '../shared/typography';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const Loading = (props : { settings : any, message : string }) => {
    return (
        <View style={{ flex : 1, justifyContent : 'center' }}>
            <ActivityIndicator
                animating={ true }
                color={ props.settings.theme.backgroundPrimary.backgroundColor }
                size={ BASE_HEIGHT * 2.5 }
                style={{ justifyContent : 'center', marginTop : BASE_HEIGHT * 5, marginBottom : BASE_HEIGHT }}
            />
            <Text style={[ Typography.regular, { textAlign : 'center' } ]}>{ props.message }</Text>
        </View>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Loading);