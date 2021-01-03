import React from "react";
import { connect } from "react-redux";

import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import NoteRow from "../components/NoteRow";
import { Divider } from "react-native-elements";
import INote from "../../../models/INote";
import { IActiveNotes } from "../redux/interfaces";

import { sharedStyles } from "../../../shared/styles";
import { ACTION_TYPES } from "../../../shared/enums";
import * as noteConstants from '../redux/constants';

import { setNoteTypeToCreate, setLocalNoteEmphasized } from '../redux/actions';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisV, faGlobe, faPlusCircle, faSun, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { baseFontSize } from "../../../shared/typography";
import PopoverMenu from "../../../customs/PopoverMenu";
import Popover from "react-native-popover-view/dist/Popover";
import Loading from '../../../customs/Loading';
import CustomError from '../../../customs/CustomError';
import Message from '../../../customs/Message';

import { getLocalNotes, deleteLocalNote } from '../redux/actions';
import { resetAttachmentRemovalStatus } from '../../attachments/redux/actions';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    authStatus : state.appReducer.authStatus,
    getNotes : state.noteReducer.getNotes,
    highlightNote : state.noteReducer.highlightNote,
    deleteNote : state.noteReducer.deleteNote
});

const mapActionsToProps = {
    setNoteTypeToCreate,
    getLocalNotes,
    resetAttachmentRemovalStatus,
    setLocalNoteEmphasized,
    deleteLocalNote
}

const PersonalActiveNotes = (props : IActiveNotes) => {
    const [items, setItems] = React.useState(new Array<INote>());
    const [shouldShowOnlyHighlightedItems, setShouldShowOnlyHighlightedItems] = React.useState(false);

    const [showPopover, setShowPopover] = React.useState(false);
    const stackButton = React.useRef('stackButton');

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity ref={ stackButton as unknown as string } style={ sharedStyles.stackBtnWrapper }
                                  onPress={ () => setShowPopover(true) }>
                    <FontAwesomeIcon icon={ faEllipsisV } size={ baseFontSize * 2 } color={ props.settings.theme.textFill.color } />
                </TouchableOpacity>
            )
        });

        props.navigation.addListener('focus', () => props.getLocalNotes());
    }, [props.navigation]);

    React.useEffect(() => {
        props.getLocalNotes();
    }, []);

    React.useEffect(() => {
        if (props.getNotes.action === noteConstants.GET_ALL_LOCAL_NOTES_SUCCESS)
            setItems(props.getNotes.items as Array<INote>);
    }, [props.getNotes]);

    React.useEffect(() => {
        if (props.highlightNote.action === noteConstants.HIGHLIGHT_LOCAL_NOTE_FAILED)
            alert('Failed! An issue happened while updating Note. Please try again.');

        if (props.highlightNote.action === noteConstants.HIGHLIGHT_LOCAL_NOTE_SUCCESS) {
            const result = props.highlightNote.result;

            if (typeof result === 'object' || !result)
                alert('Failed! An issue happened while updating Note. Please try again.');
            else
                Alert.alert(
                    "Success!",
                    'Your Note has been updated.',
                    [{
                        text: 'OK',
                        onPress: () => props.getLocalNotes()
                    }],
                    { cancelable: false }
                );
        }
    }, [props.highlightNote]);

    React.useEffect(() => {
        if (props.deleteNote.action === noteConstants.DELETE_LOCAL_NOTE_FAILED)
            alert('Failed! An issue happened while deleting note. Please try again.');

        if (props.deleteNote.action === noteConstants.DELETE_LOCAL_NOTE_SUCCESS) {
            const result = props.deleteNote.result;

            if (!result)
                alert('Failed! An issue happened while deleting Note. Please try again.');
            else
                Alert.alert(
                    "Success!",
                    'Your Note has been deleted.',
                    [{
                        text: 'OK',
                        onPress: () => props.getLocalNotes()
                    }],
                    { cancelable: false }
                );
        }
    }, [props.deleteNote]);

    const gotoNewNote = () => {
        setShowPopover(false);
        props.resetAttachmentRemovalStatus();
        props.setNoteTypeToCreate(true);
        props.navigation.navigate('New Note - Personal');
    }

    const toggleNoteHighlighting = (itemId : number, isEmphasized : boolean) => props.setLocalNoteEmphasized(itemId, isEmphasized);
    const deleteNote = (item : INote) => props.deleteLocalNote(item);

    return (
        <>
            { props.getNotes.action === noteConstants.GET_ALL_LOCAL_NOTES && <Loading message='Loading Notes.' /> }
            { props.getNotes.action === noteConstants.GET_ALL_LOCAL_NOTES_FAILED && <CustomError /> }

            {
                (
                    props.getNotes.action === noteConstants.GET_ALL_LOCAL_NOTES_SUCCESS && items.length > 0 &&
                    <ScrollView style={sharedStyles.scroller}>
                        {
                            items.filter((item : INote) =>
                                item.deletedOn === null && (
                                    !shouldShowOnlyHighlightedItems || item.emphasized === shouldShowOnlyHighlightedItems
                            ))
                                 .map((item: INote) =>
                                    <View key={ item.id }>
                                        <NoteRow
                                            item={ item }
                                            navigation={ props.navigation }
                                            toggleHighlight={ toggleNoteHighlighting }
                                            deleteNote={ deleteNote }
                                        />

                                        <Divider style={{ backgroundColor: props.settings.theme.btnDisabled.color }} />
                                    </View>
                            )
                        }
                    </ScrollView>
                ) ||
                <Message mainMessage='You have no Note.' otherMessage='Start adding your first Note by tapping the icon on top-right corner.' />
            }

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }
                     from={ stackButton } arrowStyle={{ backgroundColor : 'transparent' }}>
                <PopoverMenu actions={(
                    props.authStatus && [
                        { name : 'Add New Note', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => gotoNewNote() },
                        (
                            shouldShowOnlyHighlightedItems && { name : 'All Todos', icon : faGlobe, type : ACTION_TYPES.NORMAL, callback : () => setShouldShowOnlyHighlightedItems(false) }
                        ) || { name : 'Important Todos', icon : faSun, type : ACTION_TYPES.NORMAL, callback : () => setShouldShowOnlyHighlightedItems(true) },
                        { name : 'Sync Data', icon : faSyncAlt, type : ACTION_TYPES.NORMAL, callback : () => console.log('Sync') }
                    ]) || [
                    { name : 'Add New Note', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => gotoNewNote() },
                    (
                        shouldShowOnlyHighlightedItems && { name : 'All Todos', icon : faGlobe, type : ACTION_TYPES.NORMAL, callback : () => setShouldShowOnlyHighlightedItems(false) }
                    ) || { name : 'Important Todos', icon : faSun, type : ACTION_TYPES.NORMAL, callback : () => setShouldShowOnlyHighlightedItems(true) }
                ]} />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PersonalActiveNotes);
