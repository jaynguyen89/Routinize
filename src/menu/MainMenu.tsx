import React from "react";
import { connect } from "react-redux";

import { IAppDrawer } from "../shared/interfaces";
import ToDos from "./menuItems/ToDos";
import Notes from "./menuItems/Notes";
import Collaboration from "./menuItems/Collaboration";
import Settings from "./menuItems/Settings";
import Others from "./menuItems/Others";
import MyFocus from "./menuItems/MyFocus";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const MainMenu = (props : IAppDrawer) => {
    return (
        props.settings &&
        <>
            <MyFocus navigation={ props.navigation } />
            <ToDos navigation={ props.navigation } />
            <Notes navigation={ props.navigation } />
            <Collaboration navigation={ props.navigation } />
            <Settings navigation={ props.navigation } />
            <Others navigation={ props.navigation } />
        </>
    );
}

export default connect(
    mapStateToProps
)(MainMenu);
