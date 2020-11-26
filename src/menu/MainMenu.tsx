import React from "react";
import {connect} from "react-redux";

import styles from "./styles";
import { Typography } from "../shared/typography";
import { Text, View } from "react-native";
import { IAppDrawer } from "../shared/interfaces";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const MainMenu = (props : IAppDrawer) => {
    return (
        props.settings &&
        <>
            <View style={ styles.menuRow }>
                <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>To-Dos</Text>

                <View style={ styles.rowMenu }>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        Active To-Dos
                    </Text>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        Completed To-Dos
                    </Text>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        All To-Dos
                    </Text>
                </View>
            </View>

            <View style={ styles.menuRow }>
                <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Notes</Text>

                <View style={ styles.rowMenu }>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        All Notes
                    </Text>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        Highlighted Notes
                    </Text>
                </View>
            </View>

            <View style={ styles.menuRow }>
                <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Reminders</Text>

                <View style={ styles.rowMenu }>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        All Reminders
                    </Text>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        Active Reminders
                    </Text>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        Past Reminders
                    </Text>
                </View>
            </View>

            <View style={ styles.menuRow }>
                <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Settings</Text>

                <View style={ styles.rowMenu }>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        App Settings
                    </Text>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        Shop
                    </Text>
                </View>
            </View>

            <View style={ styles.menuRow }>
                <Text style={[ styles.rowHeader, props.settings.theme.invert, props.settings.theme.textFill ]}>Others</Text>

                <View style={ styles.rowMenu }>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        Rate this app
                    </Text>
                    <Text style={[ styles.rowItem, props.settings.theme.backgroundSecondary, props.settings.theme.border, Typography.tinyText ]}
                          onPress={() => props.navigation.navigate('Home')}>
                        App suggestions
                    </Text>
                </View>
            </View>
        </>
    );
}

export default connect(
    mapStateToProps
)(MainMenu);
