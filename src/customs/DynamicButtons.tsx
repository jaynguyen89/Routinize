import React from 'react';
import { connect } from "react-redux";

import { View } from "react-native";
import { IButtonGroup, IDynamicButton } from "../shared/interfaces";
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { ACTION_TYPES } from "../shared/enums";
import { TouchableRipple } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import styles from "./styles";
import { baseFontSize } from "../shared/typography";
import { sharedStyles } from "../shared/styles";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const DynamicButtons = (props : IButtonGroup) => {
    return (
        <View style={ styles.dynamicBtnWrapper }>
            {
                props.actions.map((action : IDynamicButton, i : number) =>
                    <View key={ i } style={[
                        styles.dynamicBtn,
                        action.type === ACTION_TYPES.NORMAL ? props.settings.theme.btnPrimary : (
                            action.type === ACTION_TYPES.CAUTIOUS ? sharedStyles.btnWarning : sharedStyles.btnDanger
                        ),
                        i === 0 ? styles.firstBtn : (
                            i === props.actions.length - 1 ? styles.lastBtn : styles.nthBtn
                        )
                    ]}>
                        <TouchableRipple onPress={ action.callback } style={[ sharedStyles.touchable, styles.dynamicBtn]}>
                            <FontAwesomeIcon icon={ action.icon as IconDefinition } size={ baseFontSize * 1.5 }
                                             style={ styles.iconCenter } color={ props.settings.theme.textFill.color } />
                        </TouchableRipple>
                    </View>
                )
            }
        </View>
    );
}

export default connect(
    mapStateToProps
)(DynamicButtons);
