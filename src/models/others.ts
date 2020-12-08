import { FILE_TYPES, ITEM_TYPES, MEDIA_TYPES } from '../shared/enums';
import ITodo from './ITodo';
import INote from './INote';
import INoteSegment from './INoteSegment';

interface IAttachment {
    id : number,
    name? : string,
    url? : string,
}

export interface IMedia extends IAttachment {
    type : MEDIA_TYPES
}

export interface IFile extends IAttachment {
    type : FILE_TYPES
}

export interface IItemSharing {
    item : ITodo | INote | INoteSegment,
    itemType : ITEM_TYPES
}

export interface IAuth {
    email : string,
    sessionId : string,
    authToken : string,
    timeStamp : number
}