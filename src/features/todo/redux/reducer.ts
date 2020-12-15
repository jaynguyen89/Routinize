import * as todoConstants from './constants';
import produce from "immer";
import ITodo from "../../../models/ITodo";

interface ITodoStore {
    isPersonal : boolean,
    todoItem : ITodo | null,
    newItem : {
        //isAdding : boolean,
        addingSuccess : boolean,
        item : ITodo | null
    }
}

const initialState : ITodoStore = {
    isPersonal : true,
    todoItem : null,
    newItem : {
        //isAdding : false,
        addingSuccess : false,
        item : null
    }
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
        case todoConstants.CREATE_TODO_SUCCESS:
            //state.newItem.isAdding = false;
            state.newItem.addingSuccess = true;
            state.newItem.item = action.payload;
            return;
        case todoConstants.CREATE_TODO_FAILED:
            //state.newItem.isAdding = false;
            state.newItem.addingSuccess = false;
            state.newItem.item = null;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
