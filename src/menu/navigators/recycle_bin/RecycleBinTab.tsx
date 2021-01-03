import React from 'react';
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { BASE_HEIGHT, baseFontSize } from "../../../shared/typography";
import { faUserFriends, faUsers, faUserTie, faUser } from "@fortawesome/free-solid-svg-icons";
import PersonalRecycleBinStack from "./PersonalRecycleBinStack";
import SharedRecycleBinStack from "./SharedRecycleBinStack";

const BottomTab = createBottomTabNavigator();

const mapStateToProps = (state: any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const RecycleBinTab = (props : any) => {
    return (
        props.settings &&
        <BottomTab.Navigator
            screenOptions={
                ({ route: route }) => ({
                    tabBarIcon: ({ focused, color, size }) =>
                        <FontAwesomeIcon
                            icon={ route.name.indexOf('Personal') !== -1 ? (focused ? faUserTie : faUser) : (focused ? faUsers : faUserFriends) }
                            size={ size } color={ color }
                        />
                })
            }

            tabBarOptions={{
                activeTintColor : props.settings.theme.btnPrimary.color,
                inactiveTintColor : props.settings.theme.btnDisabled.color,
                style : {
                    backgroundColor : props.settings.theme.backgroundPrimary.backgroundColor
                },
                labelStyle : {
                    fontSize : baseFontSize * 1.1,
                    paddingBottom : BASE_HEIGHT * 0.15
                }
            }}
        >
            <BottomTab.Screen name='Personal' component={ PersonalRecycleBinStack } options={{ tabBarBadge : 1 }} />
            <BottomTab.Screen name='Shared' component={ SharedRecycleBinStack } />
        </BottomTab.Navigator>
        || <></>
    );
}

export default connect(
    mapStateToProps
)(RecycleBinTab);
