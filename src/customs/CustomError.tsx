import React from 'react';
import { connect } from 'react-redux';

import { View, Text } from 'react-native';
import { BASE_HEIGHT, baseFontSize, Typography } from '../shared/typography';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { sharedStyles } from '../shared/styles';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const CustomError = (props: any) => {
    return (
        <View style={{ margin : 0, padding : 0, flex : 1, backgroundColor : props.settings.theme.backgroundSecondary.backgroundColor }}>
            <FontAwesomeIcon
                icon={ faExclamationTriangle }
                size={ baseFontSize * 5 }
                style={{ alignSelf : 'center', marginTop : BASE_HEIGHT * 7.5 }}
                color={ sharedStyles.btnWarning.backgroundColor }
            />

            <Text style={[ Typography.firstHeader, props.settings.theme.backgroundSecondary, { textAlign : 'center' } ]}>Something went wrong.</Text>

            <Text style={[
                { marginTop : BASE_HEIGHT * 2, alignSelf : 'center', textAlign : 'center', width : BASE_HEIGHT * 11 },
                Typography.small,
                props.settings.theme.backgroundSecondary
            ]}>
                This problem may happen if the app data is cleared.
                Please close and reopen the app so it can reload default data.
            </Text>
        </View>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(CustomError);