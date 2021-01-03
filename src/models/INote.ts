import _ from 'lodash';
import IThing from "./IThing";
import INoteSegment from "./INoteSegment";
import { EMPTY_STRING } from '../helpers/Constants';
import { IFile, IMedia } from './others';
import IAddress, { ICoordination } from './IAddress';
import { MEDIA_TYPES } from '../shared/enums';

interface INote extends IThing {
    segments : Array<INoteSegment>,
    deletedOn : string | null
}

export default INote;

export const EMPTY_SEGMENT : INoteSegment = {
    id : 0,
    body : EMPTY_STRING,
    attachments : null,
    places : null
}

export const EMPTY_NOTE : INote = {
    id : 0,
    author : null,
    isPersonal : true,
    emphasized : false,
    title : null,
    segments : new Array<INoteSegment>(_.cloneDeep(EMPTY_SEGMENT)),
    createdOn : EMPTY_STRING,
    deletedOn : null
}

export const refineLocalNotes = (things : any) : Array<INote> => {
    let notes : Array<INote> = [];

    for (let i = 0; i < things.length; i++) {
        const thing = things[i];
        let note : INote;

        if (i === 0 || (i > 0 && thing.id !== things[i - 1].id)) note = _.cloneDeep(EMPTY_NOTE);
        else note = notes.pop() as INote;

        note.id = thing.id;
        note.emphasized = thing.emphasized === 1;
        note.title = thing.title;
        note.createdOn = thing.createdOn;

        let segment : INoteSegment;
        if (i === 0 || (i > 0 && thing.id !== things[i - 1].id))
            note.segments = new Array<INoteSegment>();

        if (i === 0 || (i > 0 && thing.id !== things[i - 1].id) ||
            (i > 0 && thing.id === things[i - 1].id && thing.segmentId !== things[i - 1].segmentId)
        ) {
            segment = { id: thing.segmentId, body: thing.body } as INoteSegment;
            segment.attachments = new Array<IMedia | IFile>();
            segment.places = new Array<IAddress>();
        }
        else
            segment = note.segments.pop() as INoteSegment;

        if (thing.attachmentId) {
            let attachment : IMedia | IFile;

            if (thing.type === MEDIA_TYPES.AUDIO || thing.type === MEDIA_TYPES.PHOTO || thing.type === MEDIA_TYPES.VIDEO)
                attachment = { id : thing.attachmentId, type : thing.type } as IMedia;
            else
                attachment = { id : thing.attachmentId, type : thing.type } as IFile;

            if (thing.name) attachment.name = thing.name;
            if (thing.url) attachment.url = thing.url;

            segment.attachments?.push(attachment);
        }

        if (thing.placeId) {
            let place : IAddress = {
                id : thing.placeId,
                name : thing.addressName,
                building : thing.building,
                street : thing.street,
                suburb : thing.suburb,
                postcode : thing.postcode,
                state : thing.state,
                country : thing.country,
                coordination : {
                    lat : thing.latitude,
                    long : thing.longitude
                } as ICoordination
            };

            segment.places?.push(place);
        }

        note.segments.push(segment);
        notes.push(note);
    }

    return notes;
}