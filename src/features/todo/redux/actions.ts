import * as todoConstants from './constants'
import * as todoServices from './services';
import ITodo from "../../../models/ITodo";

export const setTodoTypeToCreate = (isPersonal : boolean) => {
    return (dispatch : any) => dispatch({
        type : todoConstants.GOTO_NEW_TODO_PERSONAL,
        payload : isPersonal
    });
}

export const setTodoDetailItem = (item : ITodo) => {
    return (dispatch : any) => dispatch({
        type : todoConstants.SET_TODO_DETAIL_ITEM,
        payload : item
    });
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

export const updateLocalTodo = (todo : ITodo, dtFormat : string) => {
    return (dispatch : any) => {
        dispatch({ type : todoConstants.UPDATE_TODO_LOCAL });

        todoServices.updateLocalTodo(todo, dtFormat)
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

export const getAllLocalTodos = () => {
    return (dispatch : any) => {
        dispatch({ type : todoConstants.GET_ALL_TODOS_LOCAL });

        todoServices.getAllLocalTodos()
            .then(response => dispatch({
                type : todoConstants.GET_ALL_TODOS_LOCAL_SUCCESS,
                payload : response
            }))
            .catch(error => dispatch({
                type : todoConstants.GET_ALL_TODOS_LOCAL_FAILED,
                error
            }));
    }
}

export const getLocalTodoAttachments = (itemId : number) => {
    return (dispatch : any) => {
        dispatch({ type : todoConstants.GET_LOCAL_TODO_ATTACHMENTS });

        todoServices.getLocalTodoAttachments(itemId)
            .then(response => dispatch({
                type : todoConstants.GET_LOCAL_TODO_ATTACHMENTS_SUCCESS,
                payload : response
            }))
            .catch(error => dispatch({
                type : todoConstants.GET_LOCAL_TODO_ATTACHMENTS_FAILED,
                error
            }));
    }
}

export const markLocalTodoAsDoneOrImportant = (itemId : number, field : string, isEmphasized : boolean) => {
    return (dispatch : any) => {
        todoServices.setDoneOrEmphasizedForLocalTodo(itemId, field, isEmphasized)
            .then(response => dispatch({
                type : todoConstants.MARK_LOCAL_TODO_AS_DONE_OR_EMPHASIZED_SUCCESS,
                payload : { itemId, field, result : response }
            }))
            .catch(error => dispatch({
                type : todoConstants.MARK_LOCAL_TODO_AS_DONE_OR_EMPHASIZED_FAILED,
                error
            }));
    }
}

export const markLocalTodoAsDoneWithDate = (itemId : number, date : string) => {
    return (dispatch : any) => {
        todoServices.setDoneWithDate(itemId, date)
            .then(response => dispatch({
                type : todoConstants.MARK_LOCAL_TODO_AS_DONE_WITH_DATE_SUCCESS,
                payload : { itemId, result : response }
            }))
            .catch(error => dispatch({
                type : todoConstants.MARK_LOCAL_TODO_AS_DONE_WITH_DATE_FAILED,
                error
            }));
    }
}

export const deleteLocalTodo = (item : ITodo) => {
    return (dispatch : any) => {
        todoServices.removeLocalTodoFromDb(item)
            .then(response => dispatch({
                type : todoConstants.DELETE_LOCAL_TODO_SUCCESS,
                payload : response
            }))
            .catch(error => dispatch({
                type : todoConstants.DELETE_LOCAL_TODO_FAILED,
                error
            }));
    }
}