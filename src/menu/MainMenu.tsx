import React from "react";
import { connect } from "react-redux";

import { IAppDrawer } from "../shared/interfaces";
import ToDos from "./menuItems/ToDos";
import Notes from "./menuItems/Notes";
import Reminders from "./menuItems/Reminders";
import Collaborators from "./menuItems/Collaborators";
import Settings from "./menuItems/Settings";
import Others from "./menuItems/Others";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const MainMenu = (props : IAppDrawer) => {
    return (
        props.settings &&
        <>
            <ToDos navigation={ props.navigation } />
            <Notes navigation={ props.navigation } />
            <Reminders navigation={ props.navigation } />
            <Collaborators navigation={ props.navigation } />
            <Settings navigation={ props.navigation } />
            <Others navigation={ props.navigation } />
        </>
    );
}

export default connect(
    mapStateToProps
)(MainMenu);
