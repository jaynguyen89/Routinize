import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import styles from './styles';
import AccountInfo from './components/AccountInfo';

interface IDrawerAccount {
    navigation : any,
    settings : any
}

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const DrawerAccount = (props : IDrawerAccount) => {
    return (
        props.settings &&
        <>
            <View style={[ styles.appHeading, props.settings.theme.invert ]}>
                <Text style={[ styles.header, props.settings.theme.textFill ]}>Routinize</Text>
            </View>

            <AccountInfo navigation={ props.navigation } />
        </>
    );
}

export default connect(
    mapStateToProps
)(DrawerAccount);
