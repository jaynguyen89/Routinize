import ITodo from "../../../models/ITodo";

export interface ITodos {
    navigation : any,
    todoRetrieval : {
        isRetrieving : false,
        retrievingSuccess : false,
        items : null
    },
    items : Array<ITodo> | null,
    authStatus : boolean,
    settings : any,
    setTodoTypeToCreate : any,
    getAllLocalTodos : any
}

export interface ITodoCard {
    navigation : any,
    key : string | number,
    settings : any,
    item : ITodo,
    setTodoDetailItem : any
}

export interface ITodoDetail {
    navigation : any,
    authStatus : boolean,
    settings? : any,
    item : ITodo,
    newItem : any,
    updateItem : any,
    getAttachments : any,
    isPersonal : boolean,
    createLocalTodo : any,
    updateLocalTodo : any,
    getLocalTodoAttachments : any,
    removeLocalAttachment : any,
    atmSelection : any,
    atmRemoval : any
}

export const GOTO_NEW_TODO_PERSONAL = 'GOTO_NEW_TODO_PERSONAL';
export type T_GOTO_NEW_TODO_PERSONAL = typeof GOTO_NEW_TODO_PERSONAL;

export const SET_TODO_DETAIL_ITEM = 'SET_TODO_DETAIL_ITEM';
export type T_SET_TODO_DETAIL_ITEM = typeof SET_TODO_DETAIL_ITEM;

export const CREATE_TODO_LOCAL = 'CREATE_TODO_LOCAL';
export type T_CREATE_TODO_LOCAL = typeof CREATE_TODO_LOCAL;

export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export type T_CREATE_TODO_SUCCESS = typeof CREATE_TODO_SUCCESS;

export const CREATE_TODO_FAILED = 'CREATE_TODO_FAILED';
export type T_CREATE_TODO_FAILED = typeof CREATE_TODO_FAILED;

export const UPDATE_TODO_LOCAL = 'UPDATE_TODO_LOCAL';
export type T_UPDATE_TODO_LOCAL = typeof UPDATE_TODO_LOCAL;

export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export type T_UPDATE_TODO_SUCCESS = typeof UPDATE_TODO_SUCCESS;

export const UPDATE_TODO_FAILED = 'UPDATE_TODO_FAILED';
export type T_UPDATE_TODO_FAILED = typeof UPDATE_TODO_FAILED;

export const GET_ALL_TODOS_LOCAL = 'GET_ALL_TODOS_LOCAL';
export type T_GET_ALL_TODOS = typeof GET_ALL_TODOS_LOCAL;

export const GET_ALL_TODOS_LOCAL_SUCCESS = 'GET_ALL_TODOS_LOCAL_SUCCESS';
export type T_GET_ALL_TODOS_LOCAL_SUCCESS = typeof GET_ALL_TODOS_LOCAL_SUCCESS;

export const GET_ALL_TODOS_LOCAL_FAILED = 'GET_ALL_TODOS_LOCAL_FAILED';
export type T_GET_ALL_TODOS_LOCAL_FAILED = typeof GET_ALL_TODOS_LOCAL_FAILED;

export const GET_LOCAL_TODO_ATTACHMENTS = 'GET_LOCAL_TODO_ATTACHMENTS';
export type T_GET_LOCAL_TODO_ATTACHMENTS = typeof GET_LOCAL_TODO_ATTACHMENTS;

export const GET_LOCAL_TODO_ATTACHMENTS_FAILED = 'GET_LOCAL_TODO_ATTACHMENTS_FAILED';
export type T_GET_LOCAL_TODO_ATTACHMENTS_FAILED = typeof GET_LOCAL_TODO_ATTACHMENTS_FAILED;

export const GET_LOCAL_TODO_ATTACHMENTS_SUCCESS = 'GET_LOCAL_TODO_ATTACHMENTS_SUCCESS';
export type T_GET_LOCAL_TODO_ATTACHMENTS_SUCCESS = typeof GET_LOCAL_TODO_ATTACHMENTS_SUCCESS;