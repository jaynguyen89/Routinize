import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../features/home/Home";
import Settings from "../../features/settings/Settings";

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{ cardShadowEnabled : true, headerTitleAlign : 'center' }} />
            <Stack.Screen name='Settings' component={Settings} options={{}} />
        </Stack.Navigator>
    );
}

export default HomeStack;
