import React from "react";
import { connect } from "react-redux";

import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import NoteRow from "../components/NoteRow";
import { Divider } from "react-native-elements";
import INote from "../../../models/INote";
import { IActiveNotes } from "../redux/constants";

import { sharedStyles } from "../../../shared/styles";
import { ACTION_TYPES } from "../../../shared/enums";
import * as noteConstants from '../redux/constants';

import { setNoteTypeToCreate, setLocalNoteEmphasized } from '../redux/actions';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisV, faPlusCircle, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { baseFontSize } from "../../../shared/typography";
import PopoverMenu from "../../../customs/PopoverMenu";
import Popover from "react-native-popover-view/dist/Popover";
import Loading from '../../../customs/Loading';
import CustomError from '../../../customs/CustomError';
import Message from '../../../customs/Message';

import { getLocalNotes } from '../redux/actions';
import { resetAttachmentRemovalStatus } from '../../attachments/redux/actions';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    authStatus : state.appReducer.authStatus,
    getNotes : state.noteReducer.getNotes,
    highlightNote : state.noteReducer.highlightNote
});

const mapActionsToProps = {
    setNoteTypeToCreate,
    getLocalNotes,
    resetAttachmentRemovalStatus,
    setLocalNoteEmphasized
}

const PersonalActiveNotes = (props : IActiveNotes) => {
    const [items, setItems] = React.useState(new Array<INote>());
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
            setItems(props.getNotes.items);
    }, [props.getNotes]);

    React.useEffect(() => {
        if (props.highlightNote.action === noteConstants.HIGHLIGHT_LOCAL_NOTE_FAILED)
            alert('Failed! An issue happened while updating Note. Please try again.');

        if (props.highlightNote.action === noteConstants.HIGHLIGHT_LOCAL_NOTE_SUCCESS)
            Alert.alert(
                "Success!",
                'Your Note has been updated.',
                [{
                    text: 'OK',
                    onPress: () => props.getLocalNotes()
                }],
                { cancelable: false }
            );
    }, [props.highlightNote]);

    const gotoNewNote = () => {
        setShowPopover(false);
        props.resetAttachmentRemovalStatus();
        props.setNoteTypeToCreate(true);
        props.navigation.navigate('New Note - Personal');
    }

    const toggleNoteHighlighting = (itemId : number, isEmphasized : boolean) => props.setLocalNoteEmphasized(itemId, isEmphasized);

    return (
        <>
            { props.getNotes.action === noteConstants.GET_ALL_LOCAL_NOTES && <Loading message='Loading Notes.' /> }
            { props.getNotes.action === noteConstants.GET_ALL_LOCAL_NOTES_FAILED && <CustomError /> }

            {
                (
                    props.getNotes.action === noteConstants.GET_ALL_LOCAL_NOTES_SUCCESS && items.length > 0 &&
                    <ScrollView style={sharedStyles.scroller}>
                        {
                            items.map((item: INote) => {
                                return (
                                    <View key={ item.id }>
                                        <NoteRow item={ item } navigation={ props.navigation } toggleHighlight={ toggleNoteHighlighting } />
                                        <Divider style={{ backgroundColor: props.settings.theme.btnDisabled.color }} />
                                    </View>
                                );
                            })
                        }
                    </ScrollView>
                ) ||
                <Message mainMessage='You have no Notes.' otherMessage='Start adding your first Note by tapping on the top-right corner icon.' />
            }

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }
                     from={ stackButton } arrowStyle={{ backgroundColor : 'transparent' }}>
                <PopoverMenu actions={(
                    props.authStatus && [
                        { name : 'Add New Note', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => gotoNewNote() },
                        { name : 'Sync Data', icon : faSyncAlt, type : ACTION_TYPES.NORMAL, callback : () => console.log('Sync') }
                    ]) || [
                    { name : 'Add New Note', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => gotoNewNote() }
                ]} />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PersonalActiveNotes);
