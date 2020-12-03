import React from 'react';
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import SharedArchivedNotes from "../../../features/note/archived/SharedArchivedNotes";
import NoteDetail from "../../../features/note/components/NoteDetail";
import { IAppDrawer } from "../../../shared/interfaces";

import { Typography } from "../../../shared/typography";
const Stack = createStackNavigator();

const mapStateToProps = (state: any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const SharedArchivedNotesStack = (props : IAppDrawer) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Archived Notes - Shared' component={ SharedArchivedNotes }
                          options={{
                              headerTitleStyle : Typography.thirdHeader,
                              headerTintColor : props.settings.theme.textFill.color,
                              headerStyle : {
                                  backgroundColor : props.settings.theme.backgroundPrimary.backgroundColor
                              }
                          }} />

            <Stack.Screen name='Note Details - Personal' component={ NoteDetail }
                          options={{
                              headerTitleStyle : Typography.thirdHeader,
                              headerTintColor : props.settings.theme.textFill.color,
                              headerStyle : {
                                  backgroundColor : props.settings.theme.backgroundPrimary.backgroundColor
                              }
                          }} />

            <Stack.Screen name='New Note - Personal' component={ NoteDetail }
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
)(SharedArchivedNotesStack);
