import React from 'react';
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import { IAppDrawer } from "../../../shared/interfaces";
import RandomIdeas from "../../../features/idea/RandomIdeas";

import { Typography } from "../../../shared/typography";
const Stack = createStackNavigator();

const mapStateToProps = (state: any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const RandomIdeasStack = (props : IAppDrawer) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Random Ideas' component={ RandomIdeas }
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
)(RandomIdeasStack);
