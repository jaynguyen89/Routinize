import IPlace from "./IPlace";
import IThing from "./IThing";
import { IFile, IMedia } from "./others";
import { RELATIONSHIPS } from '../shared/enums';
import ICollaborator from './ICollaborator';

interface ITodo extends IThing {
    description : string,
    details : string,
    dueDate : string,
    places : Array<IPlace> | null,
    attachments : Array<IMedia | IFile> | null,
    related : Array<IRelationship> | null,
    doneDate : string | null,
    doneBy : ICollaborator | null
}

export default ITodo;

export interface IRelationship {
    itemId : number,
    type : string, //TODO or NOTE
    relationType : RELATIONSHIPS
}