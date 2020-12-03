import React from "react";
import { connect } from "react-redux";

import { IAppDrawer } from "../shared/interfaces";
import MyFocus from "./menuItems/MyFocus";
import ToDos from "./menuItems/ToDos";
import Notes from "./menuItems/Notes";
import Collaboration from "./menuItems/Collaboration";
import Settings from "./menuItems/Settings";
import ShopAndSupports from "./menuItems/ShopAndSupports";

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
            <ShopAndSupports navigation={ props.navigation } />
        </>
    );
}

export default connect(
    mapStateToProps
)(MainMenu);
