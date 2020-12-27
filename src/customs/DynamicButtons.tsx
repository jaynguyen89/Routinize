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

// Example usage:
// <DynamicButtons actions={[
//     { icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => console.log('Add Segment') },
//     { icon : faPhotoVideo, type : ACTION_TYPES.NORMAL, callback : () => console.log('Add Media') },
//     { icon : faFileImport, type : ACTION_TYPES.NORMAL, callback : () => console.log('Add File') },
//     { icon : faMapMarkerAlt, type : ACTION_TYPES.NORMAL, callback : () => console.log('Add Location') },
//     { icon : faTrashAlt, type : ACTION_TYPES.CAUTIOUS, callback : () => console.log('Remove Attachment') },
//     { icon : faMinusCircle, type : ACTION_TYPES.DANGEROUS, callback : () => console.log('Remove Segment') }
// ]} />

const DynamicButtons = (props : IButtonGroup) => {
    return (
        <View style={[ styles.dynamicBtnWrapper, { flexDirection : props.vertical ? 'column' : 'row' } ]}>
            {
                props.actions.map((action : IDynamicButton, i : number) =>
                    <View key={ i } style={[
                        props.vertical ? styles.dynamicBtnVertical : styles.dynamicBtnHorizontal,
                        action.type === ACTION_TYPES.NORMAL ? props.settings.theme.btnPrimary : (
                            action.type === ACTION_TYPES.CAUTIOUS ? sharedStyles.btnWarning : sharedStyles.btnDanger
                        ),
                        props.vertical ? styles.lastBtn : (i === 0 ? styles.firstBtn : (
                            i === props.actions.length - 1 ? styles.lastBtn : styles.nthBtn
                        ))
                    ]}>
                        <TouchableRipple onPress={ action.callback } style={[ sharedStyles.touchable, props.vertical ? styles.dynamicBtnVertical : styles.dynamicBtnHorizontal]}>
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
