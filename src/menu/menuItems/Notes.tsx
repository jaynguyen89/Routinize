import React from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { IAppDrawer } from "../../shared/interfaces";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import { faArchive, faQuoteLeft, faRibbon } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const Notes = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Notes</Text>

            <View style={ styles.rowMenu }>
                <View style={ styles.rowMenu }>
                    <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                        <FontAwesomeIcon icon={ faQuoteLeft } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                        <Text style={[ styles.rowText, Typography.regular ]}>Active Notes</Text>
                    </View>

                    <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                        <FontAwesomeIcon icon={ faRibbon } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                        <Text style={[ styles.rowText, Typography.regular ]}>Highlighted</Text>
                    </View>

                    <View style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}>
                        <FontAwesomeIcon icon={ faArchive } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                        <Text style={[ styles.rowText, Typography.regular ]}>Archived</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(Notes);
