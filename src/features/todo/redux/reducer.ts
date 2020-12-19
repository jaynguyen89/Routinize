import * as todoConstants from './constants';
import produce from "immer";
import ITodo, { refineLocalTodos } from '../../../models/ITodo';
import { IFile, IMedia, refineLocalAttachments } from '../../../models/others';

interface ITodoStore {
    isPersonal : boolean,
    todoItem : ITodo | null,
    newItem : {
        //isAdding : boolean,
        addingSuccess : boolean,
        itemId : number
    },
    itemList : {
        isRetrieving : boolean,
        retrievingSuccess : boolean,
        items : Array<ITodo> | null
    },
    updateItem : {
        isUpdating : boolean,
        updateResult : boolean
    },
    getAttachments : {
        isRetrieving : boolean,
        retrievingSuccess : boolean,
        attachments : Array<IMedia | IFile> | null
    }
}

const initialState : ITodoStore = {
    isPersonal : true,
    todoItem : null,
    newItem : {
        //isAdding : false,
        addingSuccess : false,
        itemId : 0
    },
    itemList : {
        isRetrieving : false,
        retrievingSuccess : false,
        items : null
    },
    updateItem : {
        isUpdating : false,
        updateResult : false
    },
    getAttachments : {
        isRetrieving : false,
        retrievingSuccess : false,
        attachments : null
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
        case todoConstants.GET_ALL_TODOS_LOCAL:
            state.itemList.isRetrieving = true;
            state.itemList.retrievingSuccess = false;
            state.itemList.items = null;
            return;
        case todoConstants.GET_ALL_TODOS_LOCAL_SUCCESS:
            state.itemList.isRetrieving = false;
            state.itemList.retrievingSuccess = true;
            state.itemList.items = refineLocalTodos(action.payload);
            return;
        case todoConstants.GET_ALL_TODOS_LOCAL_FAILED:
            state.itemList.isRetrieving = false;
            state.itemList.retrievingSuccess = false;
            state.itemList.items = action.error;
            return;
        case todoConstants.UPDATE_TODO_LOCAL:
            state.updateItem.isUpdating = true;
            state.updateItem.updateResult = false;
            return;
        case todoConstants.UPDATE_TODO_SUCCESS:
            state.updateItem.isUpdating = false;
            state.updateItem.updateResult = action.payload;
            return;
        case todoConstants.UPDATE_TODO_FAILED:
            state.updateItem.isUpdating = false;
            state.updateItem.updateResult = action.error;
            return;
        case todoConstants.GET_LOCAL_TODO_ATTACHMENTS:
            state.getAttachments.isRetrieving = true;
            state.getAttachments.retrievingSuccess = false;
            state.getAttachments.attachments = null;
            return;
        case todoConstants.GET_LOCAL_TODO_ATTACHMENTS_SUCCESS:
            state.getAttachments.isRetrieving = false;
            state.getAttachments.retrievingSuccess = true;
            state.getAttachments.attachments = refineLocalAttachments(action.payload);
            return;
        case todoConstants.GET_LOCAL_TODO_ATTACHMENTS_FAILED:
            state.getAttachments.isRetrieving = false;
            state.getAttachments.retrievingSuccess = false;
            state.getAttachments.attachments = action.error;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
