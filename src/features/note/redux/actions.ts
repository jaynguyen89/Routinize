import * as noteConstants from './constants';
import * as noteServices from './services';
import INote from "../../../models/INote";

export const setNoteTypeToCreate = (isPersonal : boolean) => {
    return (dispatch : any) => {
        dispatch({
            type : noteConstants.GOTO_NEW_NOTE_PERSONAL,
            payload : isPersonal
        });
    };
}

export const setNoteDetailItem = (item : INote) => {
    return (dispatch : any) => {
        dispatch({
            type : noteConstants.SET_NOTE_DETAIL_ITEM,
            payload : item
        });
    };
}

export const saveLocalNote = (note : INote, removedSegmentIndexes : Array<number>) => {
    return (dispatch : any) => {
        dispatch({ type : noteConstants.SAVE_LOCAL_NOTE });

        noteServices.saveLocalNoteToDb(note, removedSegmentIndexes)
            .then(result => dispatch({
                type : noteConstants.SAVE_LOCAL_NOTE_SUCCESS,
                payload : result
            }))
            .catch(error => dispatch({
                type : noteConstants.SAVE_LOCAL_NOTE_FAILED,
                error
            }));
    };
}

export const updateLocalNote = (note : INote, removedSegmentIndexes : Array<number>) => {
    return (dispatch : any) => {
        dispatch({ type : noteConstants.UPDATE_LOCAL_NOTE });

        noteServices.updateLocalNoteToDb(note, removedSegmentIndexes)
            .then(result => dispatch({
                type : noteConstants.UPDATE_LOCAL_NOTE_SUCCESS,
                payload : result
            }))
            .catch(error => dispatch({
                type : noteConstants.UPDATE_LOCAL_NOTE_FAILED,
                error
            }));
    };
}

export const getLocalNotes = () => {
    return (dispatch : any) => {
        dispatch({ type : noteConstants.GET_ALL_LOCAL_NOTES });

        noteServices.getLocalNotesFromDb()
            .then(result => dispatch({
                type : noteConstants.GET_ALL_LOCAL_NOTES_SUCCESS,
                payload : result
            }))
            .catch(error => dispatch({
                type : noteConstants.GET_ALL_LOCAL_NOTES_FAILED,
                error
            }));
    };
}

export const setLocalNoteEmphasized = (itemId : number, isEmphasized : boolean) => {
    return (dispatch : any) => {
        noteServices.updateLocalNoteEmphasized(itemId, isEmphasized)
            .then(response => dispatch({
                type : noteConstants.HIGHLIGHT_LOCAL_NOTE_SUCCESS,
                payload : response
            }))
            .catch(error => dispatch({
                type : noteConstants.HIGHLIGHT_LOCAL_NOTE_FAILED,
                error
            }));
    }
}