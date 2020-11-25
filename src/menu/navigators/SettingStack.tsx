import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../features/home/Home";
import Settings from "../../features/settings/Settings";

const Stack = createStackNavigator();

const SettingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{}} />
            <Stack.Screen name='Settings' component={Settings} options={{}} />
        </Stack.Navigator>
    );
}

export default SettingStack;
