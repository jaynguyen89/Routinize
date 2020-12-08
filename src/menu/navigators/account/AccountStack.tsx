import React from 'react';
import { connect } from 'react-redux';

import CustomError from '../../../customs/CustomError';
import SignIn from '../../../auth/SignIn';

import { createStackNavigator } from "@react-navigation/stack";
import { Typography } from '../../../shared/typography';

const Stack = createStackNavigator();

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const AccountStack = (props: any) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Error' component={ CustomError }
                          options={{
                              headerTitleStyle : Typography.thirdHeader,
                              headerTintColor : props.settings.theme.textFill.color,
                              headerStyle : {
                                  backgroundColor : props.settings.theme.backgroundPrimary.backgroundColor
                              }
                          }} />

            <Stack.Screen name='SignIn' component={ SignIn }
                          options={{
                              headerTitleStyle : Typography.thirdHeader,
                              headerTintColor : props.settings.theme.textFill.color,
                              headerStyle : {
                                  backgroundColor : props.settings.theme.backgroundPrimary.backgroundColor
                              }
                          }} />
        </Stack.Navigator>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(AccountStack);