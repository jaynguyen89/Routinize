import IThing from "./IThing";
import INoteSegment from "./INoteSegment";
import { EMPTY_STRING } from '../helpers/Constants';

interface INote extends IThing {
    segments : Array<INoteSegment>
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
    segments : new Array<INoteSegment> (EMPTY_SEGMENT),
    createdOn : EMPTY_STRING
}

export const refineLocalNotes = (things : any) : Array<INote> => {
    let notes : Array<INote> = [];

    things.forEach((thing : any) => {
        let note : INote = EMPTY_NOTE;
        note = {
            ...note,
            id : thing.id,
            emphasized : thing.emphasized === 1,
            title : thing.title,
            createdOn : thing.createdOn,
            segments : new Array<INoteSegment>()
        };

        thing.segments.forEach((thingSegment : any) => {
            let segment : INoteSegment = EMPTY_SEGMENT;
            segment.id = thingSegment.id;
            segment.body = thingSegment.body;
            segment.attachments = thingSegment.attachments || null;
            segment.places = thingSegment.places || null;

            note.segments.push(segment);
        });

        notes.push(note);
    });

    return notes;
}