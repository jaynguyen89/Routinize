import React from "react";
import { connect } from "react-redux";

import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { IDynamicButton, IPopoverContent } from '../shared/interfaces';

import styles from "./styles";
import { Typography } from "../shared/typography";
import { ACTION_TYPES } from "../shared/enums";
import { sharedStyles } from "../shared/styles";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const PopoverContent = (props : IPopoverContent) => {
    return (
        <View style={ styles.popover }>
            <Text style={[ Typography.fourthHeader, props.settings.theme.black, styles.popoverTitle ]}>Actions</Text>

            {
                props.actions.map((action : IDynamicButton) =>
                    <Button mode='contained' dark key={ action.name } icon={ action.icon as string }
                            style={[
                                action.type === ACTION_TYPES.DANGEROUS ? props.settings.theme.danger : (
                                    action.type === ACTION_TYPES.CAUTIOUS ? sharedStyles.btnWarning : props.settings.theme.btnPrimary
                                ),
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
