import React from "react";
import { connect } from "react-redux";

import { ScrollView, View, ViewStyle } from "react-native";
import { Icon, Input, Text } from 'react-native-elements';
import { Button } from "react-native-paper";
import { ITodoDetail } from "../redux/constants";

import styles from "../styles";
import { Typography } from "../../../shared/typography";
import { sharedStyles } from "../../../shared/styles";

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
                       rightIcon={ <Icon name='person-search' size={ 24 }
                                        color={ props.settings.theme.textFill.color }
                                        style={[ props.settings.theme.btnPrimary, sharedStyles.inputFieldBtn ] as ViewStyle }
                       /> }
                />
            </View>

            <View style={ sharedStyles.inputWrapper }>
                <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Places</Text>
                <Input placeholder='Address or Place Name' style={[ Typography.regular, { flex : 1 } ]}
                       leftIcon={ <Icon name='map' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                       rightIcon={ <Icon name='maps-ugc' size={ 24 }
                                         color={ props.settings.theme.textFill.color }
                                         style={[ props.settings.theme.btnPrimary, sharedStyles.inputFieldBtn ] as ViewStyle }
                       /> }
                />
            </View>

            <View style={[ sharedStyles.inputWrapper, { flexDirection : 'row' } ]}>
                <Button mode='contained' dark icon='image-plus'
                        style={[ props.settings.theme.btnPrimary, sharedStyles.btnWrapper ]}>
                    Attach Photos
                </Button>

                <Button mode='contained' dark icon='file-plus'
                        style={[ props.settings.theme.btnPrimary, sharedStyles.btnWrapper ]}>
                    Attach Files
                </Button>
            </View>

            <View style={ sharedStyles.inputWrapper }>
                <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>More Details</Text>
                <Input placeholder='Give more information to help yourself later'
                       style={[ Typography.regular, sharedStyles.textarea ]} multiline numberOfLines={ 5 } />
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
        </ScrollView>
    );
}

export default connect(
    mapStateToProps
)(TodoDetail);
