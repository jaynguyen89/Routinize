import React from 'react';
import { connect } from 'react-redux';

import { View, Text } from 'react-native';
import { IMessage } from '../shared/interfaces';

import styles from './styles';
import { Typography } from '../shared/typography';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const Message = (props: IMessage) => {
    return (
        <View style={{ flex : 1, alignContent : 'center' }}>
            <Text style={[ styles.mainMessage, Typography.secondHeader ]}>{ props.mainMessage }</Text>
            <Text style={[ styles.otherMessage, Typography.regular ]}>{ props.otherMessage }</Text>
        </View>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Message);