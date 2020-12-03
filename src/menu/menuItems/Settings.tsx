import React from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { IAppDrawer } from "../../shared/interfaces";
import { TouchableRipple } from "react-native-paper";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import { faChild, faCogs } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const Settings = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Settings</Text>

            <View style={ styles.rowMenu }>
                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('Settings', { screen : 'Settings'}) }>
                        <>
                            <FontAwesomeIcon icon={ faCogs } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>App Settings</Text>
                        </>
                    </TouchableRipple>
                </View>

                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('Personalization', { screen : 'Personalization'}) }>
                        <>
                            <FontAwesomeIcon icon={ faChild } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Personalization</Text>
                        </>
                    </TouchableRipple>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(Settings);
