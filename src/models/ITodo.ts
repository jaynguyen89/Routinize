import IAddress from "./IAddress";
import IThing from "./IThing";
import { IFile, IMedia } from "./others";
import ICollaborator from './ICollaborator';
import { IRelationship } from './IRelationship';
import { EMPTY_STRING } from '../helpers/Constants';

interface ITodo extends IThing {
    cover : string | null,
    description : string,
    details : string | null,
    dueDate : string | null,
    places : Array<IAddress> | null,
    attachments : Array<IMedia | IFile> | null,
    related : Array<IRelationship> | null,
    doneDate : string | null,
    doneBy : ICollaborator | null
}

export default ITodo;

export const EMPTY_TODO : ITodo = {
    id : 0,
    author : null,
    isPersonal : true,
    emphasized : false,
    cover : null,
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

export const refineLocalTodos = (things : any) : Array<ITodo> => {
    let todos : Array<ITodo> = [];

    things.forEach((thing : any) => {
        let todo : ITodo = EMPTY_TODO;
        todo = {
            ...todo,
            id : thing.id,
            emphasized : thing.emphasized != 0,
            title : thing.title,
            cover : thing.cover,
            description : thing.description,
            details : thing.details,
            createdOn : thing.createdOn,
            dueDate : thing.dueDate,
            doneDate : thing.doneDate
        };

        todos.push(todo);
    });

    return todos;
}