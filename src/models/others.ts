import { FILE_TYPES, MEDIA_TYPES } from "../shared/enums";

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
