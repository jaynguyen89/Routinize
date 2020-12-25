import * as noteConstants from './constants';
import produce from "immer";
import INote, { refineLocalNotes } from '../../../models/INote';

interface INoteStore {
    isPersonal : boolean,
    noteItem : INote | null,
    getNotes : {
        action : string | null,
        items : Array<INote> | object
    },
    updateNote : {
        action : string | null,
        result : boolean | object
    },
    saveNote : {
        action : string | null,
        newNoteId : number | object
    }
}

const initialState : INoteStore = {
    isPersonal : true,
    noteItem : null,
    getNotes : {
        action : null,
        items : new Array<INote>()
    },
    updateNote : {
        action : null,
        result : false
    },
    saveNote : {
        action : null,
        newNoteId : 0
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
            return;
        case noteConstants.GET_ALL_LOCAL_NOTES_SUCCESS:
            state.getNotes.action = noteConstants.GET_ALL_LOCAL_NOTES_SUCCESS;
            state.getNotes.items = refineLocalNotes(action.payload);
            return;
        case noteConstants.GET_ALL_LOCAL_NOTES_FAILED:
            state.getNotes.action = noteConstants.GET_ALL_LOCAL_NOTES_FAILED;
        state.getNotes.items = action.error;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
