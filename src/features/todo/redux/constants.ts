import ITodo from "../../../models/ITodo";
import { EMPTY_STRING } from '../../../helpers/Constants';

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
    isPersonal : boolean
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
