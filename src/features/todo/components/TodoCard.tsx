import React from "react";
import { connect } from "react-redux";

import { View, ViewStyle } from "react-native";
import { Card, FAB, Paragraph, Text } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Popover from "react-native-popover-view/dist/Popover";
import PopoverContent from "../../../customs/PopoverContent";
import { ACTION_TYPES } from "../../../shared/enums";

import { ITodoCard } from "../redux/constants";
import ITodo from "../../../models/ITodo";

import styles from "../styles";
import { baseFontSize, Typography } from "../../../shared/typography";
import { faFile, faImage, faLink, faMapMarkerAlt, faStopwatch, faSun, faUser } from "@fortawesome/free-solid-svg-icons";

import { setTodoDetailItem } from "../redux/actions";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {
    setTodoDetailItem
};

const TodoCard = (props : ITodoCard) => {
    const [showPopover, setShowPopover] = React.useState(false);

    const viewTodoDetails = (todo : ITodo) => {
        props.setTodoDetailItem(todo);
        props.navigation.navigate('Todo Details - Personal');
    }

    return (
        <>
            <Card style={ styles.todoCard } onPress={ () => viewTodoDetails(props.item) } onLongPress={ () => setShowPopover(true) }>
                {
                    props.item.attachments &&
                    <Card.Cover source={{ uri: props.item.attachments[0].url }} style={ styles.cardCover }/>
                }

                <Card.Content>
                    {
                        (
                            props.item.attachments &&
                            <View style={{ flex : 1, flexDirection : "row" }}>
                                <FontAwesomeIcon icon={ faSun } size={ baseFontSize * 1.5 }
                                                 style={[ styles.titleIcon, { color: props.settings.theme.danger.backgroundColor } as ViewStyle]}
                                />

                                <Text style={[ styles.title, Typography.fourthHeader, { flex : 9 } ]} numberOfLines={ 1 }>
                                    { props.item.title }
                                </Text>
                            </View>
                        ) || (
                            <View style={{ flex : 1, flexDirection : "row" }}>
                                {
                                    props.item.emphasized &&
                                    <FontAwesomeIcon icon={ faSun } size={baseFontSize * 1.5}
                                                     style={[ styles.titleIcon, { color: props.settings.theme.danger.backgroundColor } as ViewStyle ]}
                                    />
                                }

                                <Text style={[ styles.title, Typography.fourthHeader, { flex : props.item.emphasized ? 9 : 1 } ]} numberOfLines={ 1 }>
                                    { props.item.title }
                                </Text>
                            </View>
                        )
                    }

                    <View style={[ styles.infoWrapper, props.settings.theme.btnDisabled ]}>
                        <Text style={[ { flex : 3 }, Typography.small ]}>
                            <FontAwesomeIcon icon={ faStopwatch } size={ baseFontSize * 1.3 } />
                            { props.item.dueDate }
                        </Text>

                        {//Assignees
                            !props.item.isPersonal &&
                            <Text style={[ { flex : 1 }, Typography.small ]}>
                                <FontAwesomeIcon icon={ faUser } size={ baseFontSize * 1.3 } />
                                { '2' }
                            </Text>
                        }

                        {
                            props.item.attachments &&
                            <Text style={[ { flex: 1, textAlign : 'right' }, Typography.small ]}>
                                <FontAwesomeIcon icon={ faMapMarkerAlt } size={ baseFontSize * 1.3 } />
                                { props.item.places?.length }
                            </Text>
                        }

                        {//Images
                            props.item.attachments &&
                            <Text style={[ { flex: 1, textAlign : 'right' }, Typography.small ]}>
                                <FontAwesomeIcon icon={ faImage } size={ baseFontSize * 1.3 } />
                                { props.item.attachments.length }
                            </Text>
                        }

                        {//Files
                            props.item.attachments &&
                            <Text style={[ { flex: 1, textAlign : 'right' }, Typography.small ]}>
                                <FontAwesomeIcon icon={ faFile } size={ baseFontSize * 1.3 } />
                                { props.item.attachments.length }
                            </Text>
                        }

                        {
                            props.item.related &&
                            <Text style={[ { flex: 1, textAlign : 'right' }, Typography.small ]}>
                                <FontAwesomeIcon icon={ faLink } size={ baseFontSize * 1.3 } />
                                { props.item.related.length }
                            </Text>
                        }
                    </View>

                    <Paragraph style={ styles.paragraph } numberOfLines={ 2 }>
                        { props.item.description }
                    </Paragraph>
                </Card.Content>
            </Card>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }>
                <PopoverContent
                    actions={[
                        { name : 'Mark as Done', icon : 'check-bold', type : ACTION_TYPES.NORMAL, callback : () => console.log('Mark Done') },
                        { name : 'Make Important', icon : 'weather-sunny', type : ACTION_TYPES.NORMAL, callback : () => console.log('Important') },
                        { name : 'Delete', icon : 'delete', type : ACTION_TYPES.DANGEROUS, callback : () => console.log('Delete') }
                    ]}
                />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(TodoCard);
