import React from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { IAppDrawer } from "../../shared/interfaces";
import { TouchableRipple } from "react-native-paper";

import styles from "../styles";
import { baseFontSize, Typography } from "../../shared/typography";
import { faComments, faExternalLinkAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const ShopAndSupports = (props: IAppDrawer) => {
    return (
        <View style={ styles.menuRow }>
            <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Shop & Supports</Text>

            <View style={ styles.rowMenu }>
                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('Shop', { screen : 'Shop'}) }>
                        <>
                            <FontAwesomeIcon icon={ faShoppingCart } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Shop</Text>
                        </>
                    </TouchableRipple>
                </View>

                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('Support', { screen : 'Contact & Support'}) }>
                        <>
                            <FontAwesomeIcon icon={ faComments } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Contact & Support</Text>
                        </>
                    </TouchableRipple>
                </View>

                <View style={{ margin:0, padding:0 }}>
                    <TouchableRipple style={[ styles.rowItem, props.settings.theme.btnDisabled, props.settings.theme.border ]}
                                     onPress={ () => props.navigation.navigate('Recommendations', { screen : 'Recommendations'}) }>
                        <>
                            <FontAwesomeIcon icon={ faExternalLinkAlt } size={ baseFontSize * 1.7 } style={ styles.rowIcon } />
                            <Text style={[ styles.rowText, Typography.regular ]}>Recommendations</Text>
                        </>
                    </TouchableRipple>
                </View>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(ShopAndSupports);
