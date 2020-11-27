import React from "react";
import { connect } from "react-redux";

import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IAppDrawer } from "../../shared/interfaces";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import { faBomb, faCheck, faListAlt } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const ToDos = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>To-Dos</Text>

            <View style={ styles.rowMenu }>
                <View style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faListAlt } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>All Items</Text>
                </View>

                <View style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faBomb } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>Active</Text>
                </View>

                <View style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border ]}>
                    <FontAwesomeIcon icon={ faCheck } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                    <Text style={[ styles.rowText, Typography.regular ]}>Done</Text>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(ToDos);
