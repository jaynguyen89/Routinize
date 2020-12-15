import ITodo from '../../../models/ITodo';
import { insertTodo, updateTodo } from '../../../providers/databaseReader';
import { DATABASE_TABLES } from '../../../shared/enums';

export const saveLocalTodo = (todo : ITodo) : Promise<number> => {
    return insertTodo(DATABASE_TABLES.TODOS, todo);
}

export const updateLocalTodo = (todo : ITodo) : Promise<boolean> => {
    return updateTodo(DATABASE_TABLES.TODOS, todo);
}