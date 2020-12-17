import ITodo from '../../../models/ITodo';
import { getAttachmentsFor, getData, insertTodo, updateTodo } from '../../../providers/databaseReader';
import { DATABASE_TABLES } from '../../../shared/enums';

export const saveLocalTodo = (todo : ITodo) : Promise<number> => {
    return insertTodo(DATABASE_TABLES.TODOS, todo);
}

export const updateLocalTodo = (todo : ITodo) : Promise<boolean> => {
    return updateTodo(DATABASE_TABLES.TODOS, todo);
}

export const getAllLocalTodos = () : Promise<Array<any>> => {
    return getData(DATABASE_TABLES.TODOS);
}

export const getLocalTodoAttachments = (itemId : number) : Promise<any> => {
    return getAttachmentsFor(DATABASE_TABLES.TODOS, itemId);
}