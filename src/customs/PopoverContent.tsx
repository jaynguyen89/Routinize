import React from "react";
import { connect } from "react-redux";

import { Text, View } from "react-native";
import { Button } from "react-native-paper";

import styles from "./styles";
import {baseFontSize, Typography} from "../shared/typography";
import {faQuoteLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

interface IPopoverContent {
    settings? : any,
    actions : Array<{
        name : string,
        icon : string,
        dangerous : boolean,
        callback : any
    }>
}

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const PopoverContent = (props : IPopoverContent) => {
    return (
        <View style={ styles.popover }>
            <Text style={[ Typography.fourthHeader, props.settings.theme.black, styles.popoverTitle ]}>Actions</Text>

            {
                props.actions.map(action =>
                    <Button mode='contained' dark key={ action.name } icon={ action.icon }
                            style={[
                                action.dangerous ? props.settings.theme.danger : props.settings.theme.btnPrimary,
                                styles.popoverBtn
                            ]}
                            onPress={ action.callback }
                    >
                        { action.name }
                    </Button>
                )
            }
        </View>
    );
}

export default connect(
    mapStateToProps
)(PopoverContent);
