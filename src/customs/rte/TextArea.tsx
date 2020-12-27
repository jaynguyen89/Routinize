import React from 'react';
import { connect } from 'react-redux';

import styles from '../styles';
import { View, TextInput } from 'react-native';
import { sharedStyles } from '../../shared/styles';
import DynamicButtons from '../DynamicButtons';

import {
    faFileImport,
    faMapMarkerAlt, faMinusCircle,
    faPhotoVideo,
    faPlusCircle,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { ACTION_TYPES } from '../../shared/enums';
import { ITextArea } from '../../shared/interfaces';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const TextArea = (props: ITextArea) => {

    return (
        (
            props.withButtons &&
            <View style={{ flexDirection : props.buttonsVertical ? 'row' : 'column' }}>
                <TextInput
                    style={[ sharedStyles.textarea, styles.textArea, { flex : 9 } ]}
                    multiline={ true }
                    placeholder={ props.placeHolder }
                    value={ props.initialContent }
                    onChangeText={ content => props.getContent(content) }
                />
                <DynamicButtons vertical={ props.buttonsVertical } actions={[
                    // @ts-ignore
                    { icon : faFileImport, type : ACTION_TYPES.NORMAL, callback : props.actions[0].callback },
                    // @ts-ignore
                    { icon : faMapMarkerAlt, type : ACTION_TYPES.NORMAL, callback : props.actions[1].callback },
                    // @ts-ignore
                    { icon : faTrashAlt, type : ACTION_TYPES.DANGEROUS, callback : props.actions[2].callback }
                ]} />
            </View>
        ) ||
        <TextInput
          style={[ sharedStyles.textarea, styles.textArea, { flex : 9 } ]}
          multiline={ true }
          placeholder={ props.placeHolder }
          value={ props.initialContent }
          onChangeText={ content => props.getContent(content) }
        />
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(TextArea);