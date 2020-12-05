import ITodo from "../../../models/ITodo";
import {setTodoTypeToCreate} from "./actions";

export interface ITodos {
    navigation : any,
    items : Array<ITodo> | null,
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
    settings? : any,
    item? : ITodo,
    isPersonal : boolean
}

export const GOTO_NEW_TODO_PERSONAL = 'GOTO_NEW_TODO_PERSONAL';
export type T_GOTO_NEW_TODO_PERSONAL = typeof GOTO_NEW_TODO_PERSONAL;

export const SET_TODO_DETAIL_ITEM = 'SET_TODO_DETAIL_ITEM';
export type T_SET_TODO_DETAIL_ITEM = typeof SET_TODO_DETAIL_ITEM;
