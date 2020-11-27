import React from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { IAppDrawer } from "../../shared/interfaces";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import { faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const Reminders = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Reminders</Text>

            <View style={ styles.rowMenu }>
                <View style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faBell } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>Active Items</Text>
                </View>

                <View style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faBellSlash } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>Finished Items</Text>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(Reminders);
