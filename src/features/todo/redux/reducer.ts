import * as todoConstants from './constants';
import produce from "immer";
import ITodo from "../../../models/ITodo";

interface ITodoStore {
    isPersonal : boolean,
    todoItem : ITodo | null
}

const initialState : ITodoStore = {
    isPersonal : true,
    todoItem : null
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case todoConstants.GOTO_NEW_TODO_PERSONAL:
            state.isPersonal = action.payload;
            state.todoItem = null;
            return;
        case todoConstants.SET_TODO_DETAIL_ITEM:
            state.todoItem = action.payload;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
