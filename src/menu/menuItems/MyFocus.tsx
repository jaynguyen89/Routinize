import React from "react";
import { connect } from "react-redux";

import { Text, View } from "react-native";
import { TouchableRipple } from 'react-native-paper';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IAppDrawer } from "../../shared/interfaces";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import {faBullseye, faClipboardCheck, faClipboardList, faPercentage} from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const MyFocus = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Home: My Focus</Text>

            <View style={ styles.rowMenu }>
                <TouchableRipple onPress={ () => props.navigation.navigate('Active Todos - Personal') }>
                    <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                        <FontAwesomeIcon icon={ faClipboardCheck } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                        <Text style={[ styles.rowText, Typography.regular ]}>My Todos Summary</Text>
                    </View>
                </TouchableRipple>

                <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faClipboardList } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>My Notes Summary</Text>
                </View>

                <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faBullseye } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>My Goals</Text>
                </View>

                <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faPercentage } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>Statistics</Text>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(MyFocus);
