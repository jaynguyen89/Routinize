import * as todoConstants from './constants';
import produce from "immer";
import ITodo, { refineLocalTodos } from '../../../models/ITodo';
import { IFile, IMedia, refineLocalAttachments } from '../../../models/others';
import { EMPTY_STRING } from '../../../helpers/Constants';
import {
    GET_LOCAL_TODO_ATTACHMENTS,
    GET_LOCAL_TODO_ATTACHMENTS_FAILED,
    GET_LOCAL_TODO_ATTACHMENTS_SUCCESS
} from './constants';

interface ITodoStore {
    isPersonal : boolean,
    todoItem : ITodo | null,
    newItem : {
        addingSuccess : boolean,
        itemId : number
    },
    itemList : {
        action : string,
        items : Array<ITodo> | null
    },
    updateItem : {
        isUpdating : boolean,
        updateResult : number | object
    },
    getAttachments : {
        action : string,
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
    },
    deleteTodo : {
        action : string,
        result : boolean | null
    }
}

const initialState : ITodoStore = {
    isPersonal : true,
    todoItem : null,
    newItem : {
        addingSuccess : false,
        itemId : 0
    },
    itemList : {
        action : EMPTY_STRING,
        items : null
    },
    updateItem : {
        isUpdating : false,
        updateResult : -99
    },
    getAttachments : {
        action : EMPTY_STRING,
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
    },
    deleteTodo : {
        action : EMPTY_STRING,
        result : null
    }
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case todoConstants.GOTO_NEW_TODO_PERSONAL:
            state.isPersonal = action.payload;
            state.todoItem = null;

            state.getAttachments.action = EMPTY_STRING;
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
            state.newItem.addingSuccess = true;
            state.newItem.item = action.payload;
            return;
        case todoConstants.CREATE_TODO_FAILED:
            state.newItem.addingSuccess = false;
            state.newItem.item = null;
            return;
        case todoConstants.GET_ALL_TODOS_LOCAL:
            state.itemList.action = todoConstants.GET_ALL_TODOS_LOCAL;
            state.itemList.items = null;

            state.setDoneOrImportant.action = EMPTY_STRING;
            state.setDoneOrImportant.error = null;
            state.setDoneOrImportant.result = null;

            state.deleteTodo.action = EMPTY_STRING;
            state.deleteTodo.result = null;
            return;
        case todoConstants.GET_ALL_TODOS_LOCAL_SUCCESS:
            state.itemList.action = todoConstants.GET_ALL_TODOS_LOCAL_SUCCESS;
            state.itemList.items = refineLocalTodos(action.payload);

            state.setDoneOrImportant.action = EMPTY_STRING;
            state.setDoneOrImportant.error = null;
            state.setDoneOrImportant.result = null;

            state.deleteTodo.action = EMPTY_STRING;
            state.deleteTodo.result = null;
            return;
        case todoConstants.GET_ALL_TODOS_LOCAL_FAILED:
            state.itemList.action = todoConstants.GET_ALL_TODOS_LOCAL_FAILED;
            state.itemList.items = action.error;

            state.setDoneOrImportant.action = EMPTY_STRING;
            state.setDoneOrImportant.error = null;
            state.setDoneOrImportant.result = null;

            state.deleteTodo.action = EMPTY_STRING;
            state.deleteTodo.result = null;
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
            state.getAttachments.action = GET_LOCAL_TODO_ATTACHMENTS;
            state.getAttachments.attachments = null;
            return;
        case todoConstants.GET_LOCAL_TODO_ATTACHMENTS_SUCCESS:
            state.getAttachments.action = GET_LOCAL_TODO_ATTACHMENTS_SUCCESS;
            state.getAttachments.attachments = refineLocalAttachments(action.payload);
            return;
        case todoConstants.GET_LOCAL_TODO_ATTACHMENTS_FAILED:
            state.getAttachments.action = GET_LOCAL_TODO_ATTACHMENTS_FAILED;
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
        case todoConstants.DELETE_LOCAL_TODO_SUCCESS:
            state.deleteTodo.action = todoConstants.DELETE_LOCAL_TODO_SUCCESS;
            state.deleteTodo.result = action.payload;
            return;
        case todoConstants.DELETE_LOCAL_TODO_FAILED:
            state.deleteTodo.action = todoConstants.DELETE_LOCAL_TODO_FAILED;
            state.deleteTodo.result = action.error;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
