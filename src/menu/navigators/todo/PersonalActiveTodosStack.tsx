import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import PersonalActiveTodos from "../../../features/todo/active/PersonalActiveTodos";
const Stack = createStackNavigator();

const PersonalActiveTodosStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Active Todos - Personal' component={ PersonalActiveTodos } />
        </Stack.Navigator>
    );
}

export default PersonalActiveTodosStack;
