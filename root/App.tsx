import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import store from '../src/providers/reducerIndex';

import { getAppSettings } from '../src/features/settings/redux/actions';
import AppDrawer from "../src/menu/AppDrawer";
import HomeSummaryTab from "../src/menu/navigators/home/HomeSummaryTab";
import ActiveTodoTab from "../src/menu/navigators/todo/ActiveTodoTab";
import ActiveNoteTab from "../src/menu/navigators/note/ActiveNoteTab";

import('./debugger').then(() => console.log('Debugger is running.'));

store.dispatch(getAppSettings());
const Drawer = createDrawerNavigator();

const App: () => React.ReactNode = () => {
    return (
        <Provider store={ store }>
            <NavigationContainer>
                <Drawer.Navigator drawerContent={props => <AppDrawer { ...props } />}>
                    <Drawer.Screen name='DrawerHome' component={ HomeSummaryTab } />
                    <Drawer.Screen name='DrawerTodos' component={ ActiveTodoTab } />
                    <Drawer.Screen name='DrawerNotes' component={ ActiveNoteTab } />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
