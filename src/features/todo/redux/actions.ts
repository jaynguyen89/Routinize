import * as todoConstants from './constants'
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

