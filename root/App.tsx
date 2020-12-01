import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import store from '../src/providers/reducerIndex';
//import { StatusBar } from 'react-native';

import { getAppSettings } from '../src/features/settings/redux/actions';
import AppDrawer from "../src/menu/AppDrawer";
import ActiveTodoTab from "../src/menu/navigators/todo/ActiveTodoTab";
import ActiveNoteTab from "../src/menu/navigators/note/ActiveNoteTab";
import ActiveReminderTab from "../src/menu/navigators/reminder/ActiveReminderTab";

import('./debugger').then(() => console.log('Debugger is running.'));

store.dispatch(getAppSettings());
const Drawer = createDrawerNavigator();

const App: () => React.ReactNode = () => {
    //React.useEffect(() => { StatusBar.setHidden(true); }, []);

    return (
        <Provider store={ store }>
            <NavigationContainer>
                <Drawer.Navigator drawerContent={props => <AppDrawer { ...props } />}>
                    <Drawer.Screen name='DrawerTodos' component={ ActiveTodoTab } />
                    <Drawer.Screen name='DrawerNotes' component={ ActiveNoteTab } />
                    <Drawer.Screen name='DrawerReminders' component={ ActiveReminderTab } />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
