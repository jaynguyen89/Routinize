import React from "react";
import {connect} from "react-redux";

import { Text, View, ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableRipple } from "react-native-paper";
import PopoverContent from "../../../customs/PopoverContent";
import Popover from "react-native-popover-view/dist/Popover";
import { INoteRow } from "../redux/constants";
import INote from "../../../models/INote";

import styles from "../styles";
import { faAward, faUser } from "@fortawesome/free-solid-svg-icons";
import { baseFontSize, Typography } from "../../../shared/typography";
import { ACTION_TYPES } from "../../../shared/enums";

import { setNoteDetailItem } from "../redux/actions";
import {sharedStyles} from "../../../shared/styles";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {
    setNoteDetailItem
};

const NoteRow = (props : INoteRow) => {
    const [showPopover, setShowPopover] = React.useState(false);

    const viewNoteDetails = (note : INote) => {
        props.setNoteDetailItem(note);
        props.navigation.navigate('Note Details - Personal');
    }

    return (
        <>
            <View style={ sharedStyles.scroller }>
                <TouchableRipple style={[ styles.rowWrapper, props.settings.theme.backgroundSecondary ]}
                                 onPress={ () => viewNoteDetails(props.item) } onLongPress={ () => setShowPopover(true) }>
                    <>
                        <View style={[ styles.titleWrapper ]}>
                            {
                                props.item.emphasized &&
                                <FontAwesomeIcon icon={ faAward } size={ baseFontSize * 1.5 }
                                                 style={[ styles.titleIcon, { color: props.settings.theme.danger.backgroundColor } as ViewStyle]}
                                />
                            }

                            <Text style={[ styles.title, Typography.regular ]} numberOfLines={ 1 }>
                                {
                                    (props.item.title && props.item.title) || props.item.segments[0].body
                                }
                            </Text>
                        </View>

                        <View style={[ styles.infoSummary ]}>
                            <Text style={[ (props.item.assignees.length && { flex : 2 }) || { flex : 2, textAlign : 'right' }, Typography.small ]}>
                                { `${ props.item.author.firstName } ${ props.item.author.lastName }` }
                            </Text>

                            <Text style={[ { flex : 3 }, Typography.small ]}>{ props.item.createdOn }</Text>

                            {
                                props.item.assignees.length > 0 &&
                                <Text style={[ { flex: 1, textAlign: 'right' }, Typography.small ]}>
                                    <FontAwesomeIcon icon={ faUser } size={ baseFontSize * 1.3 }/>
                                    { props.item.assignees.length }
                                </Text>
                            }
                        </View>
                    </>
                </TouchableRipple>
            </View>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }>
                <PopoverContent
                    actions={[
                        { name : 'Highlight', icon : 'pen', type : ACTION_TYPES.NORMAL, callback : () => console.log('Mark Done') },
                        { name : 'Archive', icon : 'trash-can', type : ACTION_TYPES.CAUTIOUS, callback : () => console.log('Important') },
                        { name : 'Delete', icon : 'delete-forever', type : ACTION_TYPES.DANGEROUS, callback : () => console.log('Delete') }
                    ]}
                />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(NoteRow);
