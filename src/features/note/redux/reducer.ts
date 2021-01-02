import * as noteConstants from './constants';
import produce from "immer";
import INote, { refineLocalNotes } from '../../../models/INote';
import { EMPTY_STRING } from '../../../helpers/Constants';

interface INoteStore {
    isPersonal : boolean,
    noteItem : INote | null,
    getNotes : {
        action : string,
        items : Array<INote> | object
    },
    updateNote : {
        action : string,
        result : boolean | object
    },
    saveNote : {
        action : string,
        newNoteId : number | object
    },
    highlightNote : {
        action : string,
        result : boolean | object | null
    }
}

const initialState : INoteStore = {
    isPersonal : true,
    noteItem : null,
    getNotes : {
        action : EMPTY_STRING,
        items : new Array<INote>()
    },
    updateNote : {
        action : EMPTY_STRING,
        result : false
    },
    saveNote : {
        action : EMPTY_STRING,
        newNoteId : 0
    },
    highlightNote : {
        action : EMPTY_STRING,
        result : null
    }
}


const reducer = produce((state, action) => {
    switch (action.type) {
        case noteConstants.GOTO_NEW_NOTE_PERSONAL:
            state.isPersonal = action.payload;
            state.noteItem = null;
            return;
        case noteConstants.SET_NOTE_DETAIL_ITEM:
            state.noteItem = action.payload;
            return;
        case noteConstants.SAVE_LOCAL_NOTE:
            state.saveNote.action = noteConstants.SAVE_LOCAL_NOTE;
            state.saveNote.newNoteId = 0;
            return;
        case noteConstants.SAVE_LOCAL_NOTE_SUCCESS:4
            state.saveNote.action = noteConstants.SAVE_LOCAL_NOTE_SUCCESS;
            state.saveNote.newNoteId = action.payload;
            return;
        case noteConstants.SAVE_LOCAL_NOTE_FAILED:
            state.saveNote.action = noteConstants.SAVE_LOCAL_NOTE_FAILED;
            state.saveNote.newNoteId = action.error;
            return;
        case noteConstants.UPDATE_LOCAL_NOTE:
            state.updateNote.action = noteConstants.UPDATE_LOCAL_NOTE;
            state.updateNote.result = false;
            return;
        case noteConstants.UPDATE_LOCAL_NOTE_FAILED:
            state.updateNote.action = noteConstants.UPDATE_LOCAL_NOTE_FAILED;
            state.updateNote.result = action.error;
            return;
        case noteConstants.UPDATE_LOCAL_NOTE_SUCCESS:
            state.updateNote.action = noteConstants.UPDATE_LOCAL_NOTE_SUCCESS;
            state.updateNote.result = action.payload;
            return;
        case noteConstants.GET_ALL_LOCAL_NOTES:
            state.getNotes.action = noteConstants.GET_ALL_LOCAL_NOTES;
            state.getNotes.items = new Array<INote>();
            state.highlightNote.action = EMPTY_STRING;
            state.highlightNote.result = null;
            return;
        case noteConstants.GET_ALL_LOCAL_NOTES_SUCCESS:
            state.getNotes.action = noteConstants.GET_ALL_LOCAL_NOTES_SUCCESS;
            state.getNotes.items = refineLocalNotes(action.payload);
            state.highlightNote.action = EMPTY_STRING;
            state.highlightNote.result = null;
            return;
        case noteConstants.GET_ALL_LOCAL_NOTES_FAILED:
            state.getNotes.action = noteConstants.GET_ALL_LOCAL_NOTES_FAILED;
            state.getNotes.items = action.error;
            state.highlightNote.action = EMPTY_STRING;
            state.highlightNote.result = null;
            return;
        case noteConstants.HIGHLIGHT_LOCAL_NOTE_SUCCESS:
            state.highlightNote.action = noteConstants.HIGHLIGHT_LOCAL_NOTE_SUCCESS;
            state.highlightNote.result = action.payload;
            return;
        case noteConstants.HIGHLIGHT_LOCAL_NOTE_FAILED:
            state.highlightNote.action = noteConstants.HIGHLIGHT_LOCAL_NOTE_FAILED;
            state.highlightNote.result = action.error;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
