import * as todoConstants from './constants';
import produce from "immer";
import ITodo, { refineLocalTodos } from '../../../models/ITodo';
import { IFile, IMedia, refineLocalAttachments } from '../../../models/others';
import { EMPTY_STRING } from '../../../helpers/Constants';

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
        updateResult : number | object
    },
    getAttachments : {
        isRetrieving : boolean,
        retrievingSuccess : boolean,
        attachments : Array<IMedia | IFile> | null
    },
    setDoneOrImportant : {
        action : string,
        error : object | null,
        result : {
            itemId : number,
            task : string,
            result : boolean
        } | null
    },
    setDoneWithDate : {
        action : string,
        result : {
            itemId : number,
            result : boolean
        } | object | null
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
        updateResult : -99
    },
    getAttachments : {
        isRetrieving : false,
        retrievingSuccess : false,
        attachments : null
    },
    setDoneOrImportant : {
        action : EMPTY_STRING,
        error : null,
        result : null
    },
    setDoneWithDate : {
        action : EMPTY_STRING,
        result : null
    }
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case todoConstants.GOTO_NEW_TODO_PERSONAL:
            state.isPersonal = action.payload;
            state.todoItem = null;
            state.getAttachments.isRetrieving = false;
            state.getAttachments.retrievingSuccess = false;
            state.getAttachments.attachments = null;
            state.setDoneWithDate.action = EMPTY_STRING;
            state.setDoneWithDate.result = null;
            return;
        case todoConstants.SET_TODO_DETAIL_ITEM:
            state.todoItem = action.payload;
            state.setDoneWithDate.action = EMPTY_STRING;
            state.setDoneWithDate.result = null;
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
            state.setDoneOrImportant.action = EMPTY_STRING;
            state.setDoneOrImportant.error = null;
            state.setDoneOrImportant.result = null;
            return;
        case todoConstants.GET_ALL_TODOS_LOCAL_SUCCESS:
            state.itemList.isRetrieving = false;
            state.itemList.retrievingSuccess = true;
            state.itemList.items = refineLocalTodos(action.payload);
            state.setDoneOrImportant.action = EMPTY_STRING;
            state.setDoneOrImportant.error = null;
            state.setDoneOrImportant.result = null;
            return;
        case todoConstants.GET_ALL_TODOS_LOCAL_FAILED:
            state.itemList.isRetrieving = false;
            state.itemList.retrievingSuccess = false;
            state.itemList.items = action.error;
            state.setDoneOrImportant.action = EMPTY_STRING;
            state.setDoneOrImportant.error = null;
            state.setDoneOrImportant.result = null;
            return;
        case todoConstants.UPDATE_TODO_LOCAL:
            state.updateItem.isUpdating = true;
            state.updateItem.updateResult = -99;
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
        case todoConstants.MARK_LOCAL_TODO_AS_DONE_OR_EMPHASIZED_SUCCESS:
            state.setDoneOrImportant.action = todoConstants.MARK_LOCAL_TODO_AS_DONE_OR_EMPHASIZED_SUCCESS;
            state.setDoneOrImportant.error = null;
            state.setDoneOrImportant.result = {
                itemId : action.payload.itemId,
                task : action.payload.field,
                result : action.payload.result
            };
            return;
        case todoConstants.MARK_LOCAL_TODO_AS_DONE_OR_EMPHASIZED_FAILED:
            state.setDoneOrImportant.action = todoConstants.MARK_LOCAL_TODO_AS_DONE_OR_EMPHASIZED_FAILED;
            state.setDoneOrImportant.error = action.error;
            state.setDoneOrImportant.result = null;
            return;
        case todoConstants.MARK_LOCAL_TODO_AS_DONE_WITH_DATE_SUCCESS:
            state.setDoneWithDate.action = todoConstants.MARK_LOCAL_TODO_AS_DONE_WITH_DATE_SUCCESS;
            state.setDoneWithDate.result = {
               itemId : action.payload.itemId,
               result : action.payload.result
            };
            return;
        case todoConstants.MARK_LOCAL_TODO_AS_DONE_WITH_DATE_FAILED:
            state.setDoneWithDate.action = todoConstants.MARK_LOCAL_TODO_AS_DONE_WITH_DATE_FAILED;
            state.setDoneWithDate.result = action.error;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
