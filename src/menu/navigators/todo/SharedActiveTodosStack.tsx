import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import SharedActiveTodos from "../../../features/todo/active/SharedActiveTodos";
const Stack = createStackNavigator();

const SharedActiveTodosStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Active Todos - Shared' component={ SharedActiveTodos } />
        </Stack.Navigator>
    );
}

export default SharedActiveTodosStack;
