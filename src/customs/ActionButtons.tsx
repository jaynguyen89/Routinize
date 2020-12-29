import React from 'react';
import { connect } from "react-redux";

import { Pressable, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ACTION_TYPES } from "../shared/enums";
import { IButtonGroup, IDynamicButton } from "../shared/interfaces";
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

import { sharedStyles } from "../shared/styles";
import { baseFontSize, Typography } from '../shared/typography';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const ActionButtons = (props : IButtonGroup) => {
    return (
        <View style={[ sharedStyles.inputWrapper, { flexDirection : 'row' } ]}>
            {
                props.actions.map((action : IDynamicButton, i : number) =>
                    <Pressable android_ripple={{ color : sharedStyles.btnDanger.borderColor }}
                               style={[
                                   sharedStyles.btn, sharedStyles.btnWrapper,
                                   action.type === ACTION_TYPES.NORMAL ? props.settings.theme.btnPrimary : (
                                       action.type === ACTION_TYPES.CAUTIOUS ? sharedStyles.btnWarning : sharedStyles.btnDanger
                                   )
                               ]}
                               onPress={ action.callback }
                               key={ i }
                    >
                        <Text style={[
                            sharedStyles.btnTextWrapper,
                            {
                                color : action.type === ACTION_TYPES.NORMAL ? props.settings.theme.btnPrimary.color : (
                                        action.type === ACTION_TYPES.CAUTIOUS ? sharedStyles.btnWarning.color : sharedStyles.btnDanger.color
                                )
                            }
                        ]}>
                            <FontAwesomeIcon icon={ action.icon as IconDefinition }
                                             size={ baseFontSize * 1.5 }
                                             color={ sharedStyles.btnDanger.color }
                            />

                            { `  ${ action.name }` }
                        </Text>
                    </Pressable>
                )
            }
        </View>
    );
}

export default connect(
    mapStateToProps
)(ActionButtons);
