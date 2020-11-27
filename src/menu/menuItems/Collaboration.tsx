import React from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { IAppDrawer } from "../../shared/interfaces";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import { faHandsHelping, faObjectGroup, faUserCog } from "@fortawesome/free-solid-svg-icons";


const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const Collaboration = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Teams & Collaborators</Text>

            <View style={ styles.rowMenu }>
                <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faObjectGroup } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>My Teams</Text>
                </View>

                <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faHandsHelping } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>My Collaborators</Text>
                </View>

                <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faUserCog } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>Preferences</Text>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(Collaboration);
