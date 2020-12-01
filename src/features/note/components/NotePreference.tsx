import React from 'react';
import { connect } from "react-redux";

import styles from "../styles";
import {Pressable, View, ViewStyle} from "react-native";
import {sharedStyles} from "../../../shared/styles";
import { Icon, Input, Text} from "react-native-elements";
import {baseFontSize, Typography} from "../../../shared/typography";
import {Switch, Button} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {ACTION_TYPES} from "../../../shared/enums";
import ActionButtons from "../../../customs/ActionButtons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
});

const NotePreference = (props : any) => {
    return (
        <View style={ styles.notePrefDialog }>
            <Text style={[ Typography.fourthHeader, styles.notePrefTitle ]}>Note Preferences</Text>

            <View style={ sharedStyles.inputWrapper }>
                <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Highlight</Text>
                <Switch value={ true } color={ props.settings.theme.btnPrimary.backgroundColor } style={ styles.switcher } />
            </View>

            <View style={ sharedStyles.inputWrapper }>
                <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Share To</Text>
                <Input placeholder='Collaborator name' style={[ Typography.regular, { flex : 1 } ]}
                       leftIcon={ <Icon name='people' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                       rightIcon={ <Icon name='person-search' size={ 24 }
                                         color={ props.settings.theme.textFill.color }
                                         style={[ props.settings.theme.btnPrimary, sharedStyles.inputFieldBtn ] as ViewStyle }
                       /> }
                />
            </View>

            <ActionButtons actions={[
                { name : 'Cancel', icon : faTimesCircle, type : ACTION_TYPES.DANGEROUS, callback : () => console.log('Cancel') },
                { name : 'Done', icon : faCheckCircle, type : ACTION_TYPES.NORMAL, callback : () => console.log('Done') }
            ]} />
        </View>
    );
}

export default connect(
    mapStateToProps
)(NotePreference);
