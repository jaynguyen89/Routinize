import React from "react";
import { connect } from "react-redux";

import { View } from "react-native";
import { Card, FAB, Paragraph, Text } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Popover from "react-native-popover-view/dist/Popover";
import PopoverContent from "../../../customs/PopoverContent";

import { ITodoCard } from "../redux/constants";
import ITodo from "../../../models/ITodo";

import styles from "../styles";
import { baseFontSize, Typography } from "../../../shared/typography";
import { faFile, faImage, faLink, faMapMarkerAlt, faStopwatch, faUser } from "@fortawesome/free-solid-svg-icons";
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
            <Card style={ styles.todoCard } onPress={ () => viewTodoDetails(props.item) }>
                {
                    props.item.images &&
                    <Card.Cover source={{ uri: props.item.images[0].url }} style={ styles.cardCover }/>
                }

                {
                    props.item.images &&
                    <FAB visible small style={ styles.overlapped } icon='dots-vertical'
                         onPress={ () => setShowPopover(true) }
                    />
                }

                <Card.Content>
                    {
                        (
                            props.item.images &&
                            <Text style={[styles.title, Typography.fourthHeader]}>{ props.item.title }</Text>
                        ) || (
                            <View style={{ flex : 1 }}>
                                <Text style={[styles.title, Typography.fourthHeader, { flex : 9 }]}>{ props.item.title }</Text>
                                <FAB visible small style={[ styles.action, { flex : 1 } ]} icon='dots-vertical'
                                     onPress={ () => setShowPopover(true) }
                                />
                            </View>
                        )
                    }

                    <View style={[ styles.infoWrapper, props.settings.theme.btnDisabled ]}>
                        <Text style={[ { flex : 3 }, Typography.small ]}>
                            <FontAwesomeIcon icon={ faStopwatch } size={ baseFontSize * 1.3 } />
                            { `${ props.item.dueDate } ${ props.item.dueTime }` }
                        </Text>

                        {
                            !props.item.isPersonal &&
                            <Text style={[ { flex : 1 }, Typography.small ]}>
                                <FontAwesomeIcon icon={ faUser } size={ baseFontSize * 1.3 } />
                                { props.item.assignees.length }
                            </Text>
                        }

                        {
                            props.item.places.length !== 0 &&
                            <Text style={[ { flex: 1, textAlign : 'right' }, Typography.small ]}>
                                <FontAwesomeIcon icon={ faMapMarkerAlt } size={ baseFontSize * 1.3 } />
                                { props.item.places.length }
                            </Text>
                        }

                        {
                            props.item.images.length !== 0 &&
                            <Text style={[ { flex: 1, textAlign : 'right' }, Typography.small ]}>
                                <FontAwesomeIcon icon={ faImage } size={ baseFontSize * 1.3 } />
                                { props.item.images.length }
                            </Text>
                        }

                        {
                            props.item.files.length !== 0 &&
                            <Text style={[ { flex: 1, textAlign : 'right' }, Typography.small ]}>
                                <FontAwesomeIcon icon={ faFile } size={ baseFontSize * 1.3 } />
                                { props.item.files.length }
                            </Text>
                        }

                        {
                            props.item.related.length !== 0 &&
                            <Text style={[ { flex: 1, textAlign : 'right' }, Typography.small ]}>
                                <FontAwesomeIcon icon={ faLink } size={ baseFontSize * 1.3 } />
                                { props.item.related.length }
                            </Text>
                        }
                    </View>

                    <Paragraph style={{ textAlign : 'justify' }}>{ props.item.description }</Paragraph>
                </Card.Content>
            </Card>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }>
                <PopoverContent
                    actions={[
                        { name : 'Mark as Done', icon : 'check-bold', dangerous : false, callback : () => console.log('Mark Done') },
                        { name : 'Make Important', icon : 'weather-sunny', dangerous : false, callback : () => console.log('Important') },
                        { name : 'Delete', icon : 'delete', dangerous : true, callback : () => console.log('Delete') }
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
