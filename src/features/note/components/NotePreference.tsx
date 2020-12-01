import React from 'react';
import { connect } from "react-redux";

import styles from "../styles";
import {View, ViewStyle} from "react-native";
import {sharedStyles} from "../../../shared/styles";
import { Icon, Input, Text} from "react-native-elements";
import {Typography} from "../../../shared/typography";
import {Switch, Button} from "react-native-paper";

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

            <View style={[ sharedStyles.inputWrapper, { flexDirection : 'row' } ]}>
                <Button mode='contained' dark icon='close-circle'
                        style={[ props.settings.theme.danger, sharedStyles.btnWrapper ]}>
                    Cancel
                </Button>

                <Button mode='contained' dark icon='plus-circle'
                        style={[ props.settings.theme.btnPrimary, sharedStyles.btnWrapper ]}>
                    Done
                </Button>
            </View>
        </View>
    );
}

export default connect(
    mapStateToProps
)(NotePreference);
