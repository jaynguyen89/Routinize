import ITodo from '../../../models/ITodo';
import {
    getAttachmentsFor,
    getData,
    insertTodo,
    updateDoneOrEmphasizedFor,
    updateTodo, updateTodoAsDoneWithDate
} from '../../../providers/databaseReader';
import { DATABASE_TABLES } from '../../../shared/enums';

export const saveLocalTodo = (todo : ITodo) : Promise<number> => {
    return insertTodo(DATABASE_TABLES.TODOS, todo);
}

export const updateLocalTodo = (todo : ITodo, dtFormat : string) : Promise<number> => {
    return updateTodo(DATABASE_TABLES.TODOS, todo, dtFormat);
}

export const getAllLocalTodos = () : Promise<Array<any>> => {
    return getData(DATABASE_TABLES.TODOS);
}

export const getLocalTodoAttachments = (itemId : number) : Promise<any> => {
    return getAttachmentsFor(DATABASE_TABLES.TODOS, itemId);
}

export const setDoneOrEmphasizedForLocalTodo = (itemId : number, field : string, isEmphasized : boolean) : Promise<boolean> => {
    return updateDoneOrEmphasizedFor(itemId, DATABASE_TABLES.TODOS, field, isEmphasized);
}

export const setDoneWithDate = (itemId : number, date: string) : Promise<boolean> => {
    return updateTodoAsDoneWithDate(itemId, date);
}