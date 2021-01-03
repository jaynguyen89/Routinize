import React from "react";
import {connect} from "react-redux";

import { Alert, Text, View, ViewStyle } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableRipple } from "react-native-paper";
import PopoverContent from "../../../customs/PopoverContent";
import Popover from "react-native-popover-view/dist/Popover";
import { INoteRow } from "../redux/interfaces";
import INote from "../../../models/INote";

import styles from "../styles";
import { faAward, faUser } from "@fortawesome/free-solid-svg-icons";
import { baseFontSize, Typography } from "../../../shared/typography";
import { ACTION_TYPES } from "../../../shared/enums";

import { setNoteDetailItem } from "../redux/actions";
import { resetAttachmentRemovalStatus } from '../../attachments/redux/actions';
import {sharedStyles} from "../../../shared/styles";
import INoteSegment from '../../../models/INoteSegment';
import { IFile, IMedia } from '../../../models/others';
import { removeFileOnLocalStorage } from '../../../helpers/Assistant';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {
    setNoteDetailItem,
    resetAttachmentRemovalStatus
};

const NoteRow = (props : INoteRow) => {
    const [showPopover, setShowPopover] = React.useState(false);

    const viewNoteDetails = (note : INote) => {
        props.resetAttachmentRemovalStatus();
        props.setNoteDetailItem(note);
        props.navigation.navigate('Note Details - Personal');
    }

    const toggleNoteHighlighting = () => {
        setShowPopover(false);
        props.toggleHighlight(props.item.id, props.item.emphasized);
    }

    const confirmDeleteNote = () => {
        setShowPopover(false);

        Alert.alert(
            "Delete Note",
            "Your Note will be lost forever. Are you sure?",
            [
                {
                    text: "KEEP",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: 'DELETE',
                    onPress: () => deleteNote()
                }
            ],
            { cancelable: false }
        );
    }

    const deleteNote = () => {
        props.item.segments.forEach((segment : INoteSegment) => {
            if (segment.attachments)
                segment.attachments.forEach((attachment : IMedia | IFile) => {
                    if (attachment.name) removeFileOnLocalStorage(attachment.name, attachment.type);
                });
        });

        props.deleteNote(props.item);
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
                                    (props.item.title && props.item.title) || (props.item.segments && props.item.segments[0].body)
                                }
                            </Text>
                        </View>

                        <View style={[ styles.infoSummary ]}>
                            { /* props.item.assignees.length is replaced by number */ }
                            <Text style={[ (1 && { flex : 2 }) || { flex : 2, textAlign : 'right' }, Typography.small ]}>
                                { (props.item.author && `${ props.item.author.firstName } ${ props.item.author.lastName }`) || 'Personal' }
                            </Text>

                            <Text style={[ { flex : 3 }, Typography.small ]}>{ props.item.createdOn }</Text>

                            {
                                1 > 0 &&
                                <Text style={[ { flex: 1, textAlign: 'right' }, Typography.small ]}>
                                    <FontAwesomeIcon icon={ faUser } size={ baseFontSize * 1.3 }/>
                                    { 1 }
                                </Text>
                            }
                        </View>
                    </>
                </TouchableRipple>
            </View>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }>
                <PopoverContent
                    actions={[
                        props.item.emphasized ? { name : 'Un-highlight', icon : 'pen', type : ACTION_TYPES.NORMAL, callback : () => toggleNoteHighlighting() }
                                              : { name : 'Highlight', icon : 'pen', type : ACTION_TYPES.NORMAL, callback : () => toggleNoteHighlighting() },
                        { name : 'Archive', icon : 'trash-can', type : ACTION_TYPES.CAUTIOUS, callback : () => console.log('Archive') },
                        { name : 'Delete', icon : 'delete-forever', type : ACTION_TYPES.DANGEROUS, callback : () => confirmDeleteNote() }
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
