import React from 'react';
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import Shop from "../../../features/others/Shop";
import { IAppDrawer } from "../../../shared/interfaces";

import { Typography } from "../../../shared/typography";
const Stack = createStackNavigator();

const mapStateToProps = (state: any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const ShopStack = (props : IAppDrawer) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Shop' component={ Shop }
                          options={{
                              headerTitleStyle : Typography.thirdHeader,
                              headerTintColor : props.settings.theme.textFill.color,
                              headerStyle : {
                                  backgroundColor : props.settings.theme.backgroundPrimary.backgroundColor
                              }
                          }} />
        </Stack.Navigator>
    );
}

export default connect(
    mapStateToProps
)(ShopStack);
