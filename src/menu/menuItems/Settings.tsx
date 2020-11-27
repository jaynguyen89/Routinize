import React from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { IAppDrawer } from "../../shared/interfaces";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import { faChild, faCogs, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const Settings = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Settings</Text>

            <View style={ styles.rowMenu }>
                <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faCogs } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>App Settings</Text>
                </View>

                <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faChild } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>Personalize</Text>
                </View>

                <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faShoppingCart } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>Shop</Text>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(Settings);
