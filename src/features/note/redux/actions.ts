import * as noteConstants from './constants';
import INote from "../../../models/INote";
import * as todoConstants from "../../todo/redux/constants";

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
            type : noteConstants.SET_NEW_TODO_DETAIL_ITEM,
            payload : item
        });
    }
}
