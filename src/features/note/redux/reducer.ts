import * as noteConstants from './constants';
import produce from "immer";
import INote from "../../../models/INote";

interface INoteStore {
    isPersonal : boolean,
    noteItem : INote | null
}

const initialState : INoteStore = {
    isPersonal : true,
    noteItem : null
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
        default:
            return;
    }
}, initialState);

export default reducer;
