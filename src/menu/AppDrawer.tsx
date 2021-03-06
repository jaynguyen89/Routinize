import React from 'react';
import { connect } from "react-redux";
import { ScrollView, Text, View } from 'react-native';

import DrawerAccount from "../account/DrawerAccount";
import MainMenu from "./MainMenu";
import { IAppDrawer } from "../shared/interfaces";

import styles from './styles';
import { Typography } from "../shared/typography";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const AppDrawer = (props: IAppDrawer) => {
    return (
        props.settings &&
        <View style={ styles.drawerContainer }>
            <DrawerAccount navigation={ props.navigation } />

            <ScrollView style={ styles.scroller }>
                <MainMenu navigation={ props.navigation } />
            </ScrollView>

            <View style={[ styles.footerContainer, props.settings.theme.backgroundPrimary ]}>
                <Text style={[ props.settings.theme.textFill, Typography.tiny ]}>
                    Developed by Jay Nguyen.
                    All rights reserved.
                </Text>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(AppDrawer);
