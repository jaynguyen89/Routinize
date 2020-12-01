import React from "react";
import { connect } from "react-redux";

import { ScrollView, View, ViewStyle } from "react-native";
import { Icon, Input, Text } from 'react-native-elements';
import ActionButtons from "../../../customs/ActionButtons";
import { ACTION_TYPES } from "../../../shared/enums";
import { ITodoDetail } from "../redux/constants";

import { Typography } from "../../../shared/typography";
import { sharedStyles } from "../../../shared/styles";
import {
    faCheckCircle, faFileImport, faPhotoVideo, faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    isPersonal : state.todoReducer.isPersonal,
    item : state.todoReducer.todoItem
});

const TodoDetail = (props : ITodoDetail) => {
    const [personal, setPersonal] = React.useState(true);

    React.useEffect(() => {
        setPersonal((props.item && props.item.isPersonal) || props.isPersonal);
    }, []);

    return (
        <ScrollView style={ sharedStyles.scroller }>
            <View style={ sharedStyles.inputWrapper }>
                <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>{ 'Todo Title' }</Text>
                <Input placeholder='Max. 75 characters' style={[ Typography.regular ]}
                       leftIcon={ <Icon name='bookmark' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                />
                <Text style={[ Typography.tiny, sharedStyles.charCount, props.settings.theme.black ]}>(empty)</Text>
            </View>

            <View style={ sharedStyles.inputWrapper }>
                <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Brief Description</Text>
                <Input placeholder='Max. 150 characters' style={[ Typography.regular ]}
                       leftIcon={ <Icon name='edit' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                />
                <Text style={[ Typography.tiny, sharedStyles.charCount, props.settings.theme.black ]}>(empty)</Text>
            </View>

            <View style={ sharedStyles.inputWrapper }>
                <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Due Date</Text>
                <Input placeholder='Tap to open Date Picker' style={[ Typography.regular ]} showSoftInputOnFocus={ false }
                       leftIcon={ <Icon name='calendar-today' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                />
            </View>

            <View style={ sharedStyles.inputWrapper }>
                <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Share To</Text>
                <Input placeholder='Name of Collaborator to search' style={[ Typography.regular, { flex : 1 } ]}
                       leftIcon={ <Icon name='people' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                       rightIcon={ <Icon name='person-search' size={ 18 }
                                        color={ props.settings.theme.textFill.color }
                                        style={[ props.settings.theme.btnPrimary, sharedStyles.inputFieldBtn ] as ViewStyle }
                       /> }
                />
            </View>

            <View style={ sharedStyles.inputWrapper }>
                <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Places</Text>
                <Input placeholder='Address or Place Name' style={[ Typography.regular, { flex : 1 } ]}
                       leftIcon={ <Icon name='map' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                       rightIcon={ <Icon name='maps-ugc' size={ 18 }
                                         color={ props.settings.theme.textFill.color }
                                         style={[ props.settings.theme.btnPrimary, sharedStyles.inputFieldBtn ] as ViewStyle }
                       /> }
                />
            </View>

            <ActionButtons actions={[
                { name : 'Add Media', icon : faPhotoVideo, type : ACTION_TYPES.NORMAL, callback : () => console.log('Add Media') },
                { name : 'Add File', icon : faFileImport, type : ACTION_TYPES.NORMAL, callback : () => console.log('Add File') }
            ]} />

            <View style={ sharedStyles.inputWrapper }>
                <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>More Details</Text>
                <Input placeholder='Give more information to help yourself later'
                       style={[ Typography.regular, sharedStyles.textarea ]} multiline numberOfLines={ 5 } />
            </View>

            <ActionButtons actions={[
                { name : 'Cancel', icon : faTimesCircle, type : ACTION_TYPES.DANGEROUS, callback : () => console.log('Cancel') },
                { name : 'Done', icon : faCheckCircle, type : ACTION_TYPES.NORMAL, callback : () => console.log('Done') }
            ]} />
        </ScrollView>
    );
}

export default connect(
    mapStateToProps
)(TodoDetail);
