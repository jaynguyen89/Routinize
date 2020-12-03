import React from "react";
import { connect } from "react-redux";

import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableRipple } from "react-native-paper";
import { IAppDrawer } from "../../shared/interfaces";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import { faArchive, faAward, faLightbulb, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const Notes = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Notes</Text>

            <View style={ styles.rowMenu }>
                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('ActiveNotes', { screen : 'Active Notes - Personal'}) }>
                        <>
                            <FontAwesomeIcon icon={ faQuoteLeft } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Active</Text>
                        </>
                    </TouchableRipple>
                </View>

                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('HighlightedNotes', { screen : 'Highlighted Notes - Personal'}) }>
                        <>
                            <FontAwesomeIcon icon={ faAward } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Highlighted</Text>
                        </>
                    </TouchableRipple>
                </View>

                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('ArchivedNotes', { screen : 'Archived Notes - Personal'}) }>
                        <>
                            <FontAwesomeIcon icon={ faArchive } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Archived</Text>
                        </>
                    </TouchableRipple>
                </View>

                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('RandomIdeas', { screen : 'Random Ideas'}) }>
                        <>
                            <FontAwesomeIcon icon={ faLightbulb } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Random Ideas</Text>
                        </>
                    </TouchableRipple>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(Notes);
