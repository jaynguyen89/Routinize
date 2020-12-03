import React from "react";
import { connect } from "react-redux";

import { Text, View } from "react-native";
import { TouchableRipple } from 'react-native-paper';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IAppDrawer } from "../../shared/interfaces";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import { faChartBar, faTasks } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const MyFocus = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Home</Text>

            <View style={ styles.rowMenu }>
                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('DrawerSummary', { screen : 'Summary - Personal Activities'}) }>
                        <>
                            <FontAwesomeIcon icon={ faTasks } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Summary</Text>
                        </>
                    </TouchableRipple>
                </View>

                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('DrawerStatistics', { screen : 'Statistics - Personal Activities'}) }>
                        <>
                            <FontAwesomeIcon icon={ faChartBar } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Statistics</Text>
                        </>
                    </TouchableRipple>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(MyFocus);
