import React from 'react';
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import SharedStatistics from "../../../features/home/statistics/SharedStatistics";
import { IAppDrawer } from "../../../shared/interfaces";

import { Typography } from "../../../shared/typography";
const Stack = createStackNavigator();

const mapStateToProps = (state: any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const PersonalStatisticsStack = (props : IAppDrawer) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Statistics - Shared Activities' component={ SharedStatistics }
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
)(PersonalStatisticsStack);
