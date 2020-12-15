import * as todoConstants from './constants'
import * as todoServices from './services';
import ITodo from "../../../models/ITodo";

export const setTodoTypeToCreate = (isPersonal : boolean) => {
    return (dispatch : any) => {
        dispatch({
            type : todoConstants.GOTO_NEW_TODO_PERSONAL,
            payload : isPersonal
        });
    };
}

export const setTodoDetailItem = (item : ITodo) => {
    return (dispatch : any) => {
        dispatch({
            type : todoConstants.SET_TODO_DETAIL_ITEM,
            payload : item
        });
    }
}

export const createLocalTodo = (todo : ITodo) => {
    return (dispatch : any) => {
        //dispatch({ type : todoConstants.CREATE_TODO_LOCAL });

        todoServices.saveLocalTodo(todo)
            .then(response => dispatch({
                type : todoConstants.CREATE_TODO_SUCCESS,
                payload : response
            }))
            .catch(error => dispatch({
                type : todoConstants.CREATE_TODO_FAILED,
                error
            }));
    }
}

export const updateLocalTodo = (todo : ITodo) => {
    return (dispatch : any) => {
        //dispatch({ type : todoConstants.UPDATE_TODO_LOCAL });

        todoServices.saveLocalTodo(todo)
            .then(response => dispatch({
                type : todoConstants.UPDATE_TODO_SUCCESS,
                payload : response
            }))
            .catch(error => dispatch({
                type : todoConstants.UPDATE_TODO_FAILED,
                error
            }));
    };
}