import ITodo from '../../../models/ITodo';
import { IFile, IMedia } from '../../../models/others';

export interface ITodos {
    navigation : any,
    items : Array<ITodo> | null,
    authStatus : boolean,
    settings : any,
    todoRetrieval : {
        isRetrieving : false,
        retrievingSuccess : false,
        items : null
    },
    deleteTodo : {
        action : string,
        result : boolean | null
    },
    setDoneOrImportant : {
        action : string,
        error : object | null,
        result : {
            itemId : number,
            task : string,
            result : boolean
        } | null
    },
    setTodoTypeToCreate : (isPersonal : boolean) => void,
    getAllLocalTodos : () => void,
    resetAttachmentRemovalStatus : () => void,
    markLocalTodoAsDoneOrImportant : (
        itemId : number, field : string, isEmphasized : boolean
    ) => void,
    deleteLocalTodo : (item : ITodo) => void
}

export interface ITodoCard {
    navigation : any,
    key : string | number,
    settings : any,
    item : ITodo,
    setTodoDetailItem : (item : ITodo) => void,
    resetAttachmentRemovalStatus : () => void,
    setDoneOrImportant : (itemId : number, field : string, isEmphasized : boolean) => void,
    deleteTodo : (item : ITodo) => void
}

export interface ITodoDetail {
    navigation : any,
    authStatus : boolean,
    settings? : any,
    item : ITodo,
    newItem : {
        //isAdding : boolean,
        addingSuccess : boolean,
        itemId : number
    },
    updateItem : {
        isUpdating : boolean,
        updateResult : number | object
    },
    getAttachments : {
        isRetrieving : boolean,
        retrievingSuccess : boolean,
        attachments : Array<IMedia | IFile> | null
    },
    atmRemoval : {
        action : string,
        removedId : number,
        segmentIndex? : number
    },
    markLocalTodoAsDoneWithDate : (itemId : number, date : string) => any,
    setDoneWithDate : {
        action : string,
        result : {
            itemId : number,
            result : boolean
        } | object | null
    },
    isPersonal : boolean,
    createLocalTodo : (todo : ITodo) => void,
    updateLocalTodo : (todo : ITodo, dtFormat : string) => void,
    getLocalTodoAttachments : (itemId : number) => void,
    removeLocalAttachment : (attachmentId : number, segmentIndex : number) => void
}