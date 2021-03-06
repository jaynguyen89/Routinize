import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";

import RNFS from 'react-native-fs';
import store from '../src/providers/reducerIndex';

import { getAppSettings } from '../src/features/settings/redux/actions';
import { getAuthData } from '../src/auth/redux/actions';

import AppDrawer from "../src/menu/AppDrawer";
import HomeSummaryTab from "../src/menu/navigators/home/HomeSummaryTab";
import AccountStack from '../src/menu/navigators/account/AccountStack';
import HomeUpcomingTaskTab from "../src/menu/navigators/home/HomeUpcomingTaskTab";
import ActiveTodoTab from "../src/menu/navigators/todo/ActiveTodoTab";
import ActiveNoteTab from "../src/menu/navigators/note/ActiveNoteTab";
import DoneTodoTab from "../src/menu/navigators/todo/DoneTodoTab";
import RecycleBinTab from "../src/menu/navigators/recycle_bin/RecycleBinTab";
import RandomIdeasStack from "../src/menu/navigators/note/RandomIdeasStack";
import TeamStack from "../src/menu/navigators/collaboration/TeamStack";
import CollaboratorStack from "../src/menu/navigators/collaboration/CollaboratorStack";
import InvitationStack from "../src/menu/navigators/collaboration/InvitationStack";
import SettingsStack from "../src/menu/navigators/settings/SettingsStack";
import PersonalizationStack from "../src/menu/navigators/settings/PersonalizationStack";
import RecommendationStack from "../src/menu/navigators/others/RecommendationStack";
import SupportStack from "../src/menu/navigators/others/SupportStack";
import ShopStack from "../src/menu/navigators/others/ShopStack";

import('./debugger').then(() => console.log('Debugger is running.'));

store.dispatch(getAppSettings());
store.dispatch(getAuthData());
const Drawer = createDrawerNavigator();

const App: () => React.ReactNode = () => {

    React.useEffect(() => {
        RNFS.exists(RNFS.ExternalDirectoryPath + '/images')
            .then(isExisted => {
                if (!isExisted) RNFS.mkdir(RNFS.ExternalDirectoryPath + '/images');
            });

        RNFS.exists(RNFS.ExternalDirectoryPath + '/videos')
            .then(isExisted => {
                if (!isExisted) RNFS.mkdir(RNFS.ExternalDirectoryPath + '/videos');
            });

        RNFS.exists(RNFS.ExternalDirectoryPath + '/audios')
            .then(isExisted => {
                if (!isExisted) RNFS.mkdir(RNFS.ExternalDirectoryPath + '/audios');
            });

        RNFS.exists(RNFS.ExternalDirectoryPath + '/files')
            .then(isExisted => {
                if (!isExisted) RNFS.mkdir(RNFS.ExternalDirectoryPath + '/files');
            });
    }, []);

    return (
        <Provider store={ store }>
            <NavigationContainer>
                <Drawer.Navigator drawerContent={props => <AppDrawer { ...props } />}>
                    <Drawer.Screen name='UpcomingTasks' component={ HomeUpcomingTaskTab } />
                    <Drawer.Screen name='Summary' component={ HomeSummaryTab } />

                    <Drawer.Screen name='ActiveTodos' component={ ActiveTodoTab } />
                    <Drawer.Screen name='DoneTodos' component={ DoneTodoTab } />

                    <Drawer.Screen name='ActiveNotes' component={ ActiveNoteTab } />
                    <Drawer.Screen name='RandomIdeas' component={ RandomIdeasStack } />

                    <Drawer.Screen name='Teams' component={ TeamStack } />
                    <Drawer.Screen name='Collaborators' component={ CollaboratorStack } />
                    <Drawer.Screen name='Invitations' component={ InvitationStack } />
                    <Drawer.Screen name='RecycleBin' component={ RecycleBinTab } />

                    <Drawer.Screen name='Settings' component={ SettingsStack } />
                    <Drawer.Screen name='Personalization' component={ PersonalizationStack } />

                    <Drawer.Screen name='Shop' component={ ShopStack } />
                    <Drawer.Screen name='Support' component={ SupportStack } />
                    <Drawer.Screen name='Recommendations' component={ RecommendationStack } />

                    <Drawer.Screen name='Account' component={ AccountStack } />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
