import ITodo from "../../../models/ITodo";
import { EMPTY_STRING } from '../../../helpers/Constants';
import { createLocalTodo, updateLocalTodo } from './actions';

export interface ITodos {
    navigation : any,
    items : Array<ITodo> | null,
    authStatus : boolean,
    settings : any,
    setTodoTypeToCreate : any
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
    isPersonal : boolean,
    createLocalTodo : any,
    updateLocalTodo : any
}

export const EMPTY_TODO : ITodo = {
    id : 0,
    author : null,
    isPersonal : true,
    emphasized : false,
    title : null,
    createdOn : EMPTY_STRING,
    description : EMPTY_STRING,
    details : EMPTY_STRING,
    dueDate : null,
    places : null,
    attachments : null,
    related : null,
    doneDate : null,
    doneBy : null
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