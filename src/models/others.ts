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

export const refineLocalAttachments = (things : Array<any>) : Array<IMedia | IFile> | null => {
    if (things == null) return null;

    let attachments : Array<IMedia | IFile> = [];
    things.forEach(thing => {
        if (
            thing.type === MEDIA_TYPES.PHOTO ||
            thing.type === MEDIA_TYPES.VIDEO ||
            thing.type === MEDIA_TYPES.AUDIO
        ) {
            let media : IMedia = { id : thing.id, type : thing.type } as IMedia;

            if (thing.name) media.name = thing.name;
            if (thing.url) media.url = thing.url;

            attachments.push(media);
            return;
        }

        let file : IFile = { id : thing.id, type : thing.type } as IFile;

        if (thing.name) file.name = thing.name;
        if (thing.url) file.url = thing.url;

        attachments.push(file);
        return;
    });

    return attachments;
}