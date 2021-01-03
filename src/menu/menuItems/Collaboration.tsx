import React from "react";
import { connect } from "react-redux";

import { Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IAppDrawer } from "../../shared/interfaces";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import { faArchive, faHandsHelping, faObjectGroup, faShareAlt } from '@fortawesome/free-solid-svg-icons';


const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const Collaboration = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Teams & Collaborators</Text>

            <View style={ styles.rowMenu }>
                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('Teams', { screen : 'My Teams'}) }>
                        <>
                            <FontAwesomeIcon icon={ faObjectGroup } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>My Teams</Text>
                        </>
                    </TouchableRipple>
                </View>

                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('Collaborators', { screen : 'My Collaborators'}) }>
                        <>
                            <FontAwesomeIcon icon={ faHandsHelping } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>My Collaborators</Text>
                        </>
                    </TouchableRipple>
                </View>

                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('Invitations', { screen : 'Invitations'}) }>
                        <>
                            <FontAwesomeIcon icon={ faShareAlt } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Invitations</Text>
                        </>
                    </TouchableRipple>
                </View>

                <View style={{ margin:0, paddingTop:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border, styles.archivedRow ]}
                                     onPress={ () => props.navigation.navigate('RecycleBin', { screen : 'Recycle Bin - Personal'}) }>
                        <>
                            <FontAwesomeIcon icon={ faArchive } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Recycle Bin</Text>
                        </>
                    </TouchableRipple>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(Collaboration);
