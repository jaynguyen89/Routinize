import _ from 'lodash';
import { getData, insertNote, updateNote } from '../../../providers/databaseReader';
import { removeFileOnLocalStorage } from '../../../helpers/Assistant';
import INote from '../../../models/INote';
import INoteSegment from '../../../models/INoteSegment';
import { IFile, IMedia } from '../../../models/others';
import { DATABASE_TABLES } from '../../../shared/enums';

export const saveLocalNoteToDb = (note : INote, removedSegmentIndexes : Array<number>) : Promise<number> => {
    note.segments = removeSegmentIfNecessary(_.cloneDeep(note.segments), removedSegmentIndexes);
    return insertNote(DATABASE_TABLES.NOTES, note);
}

export const getLocalNotesFromDb = () : Promise<any> => {
    return getData(DATABASE_TABLES.NOTES);
}

export const updateLocalNoteToDb = (note : INote, removedSegmentIndexes : Array<number>) : Promise<boolean> => {
    note.segments = removeSegmentIfNecessary(_.cloneDeep(note.segments), removedSegmentIndexes);
    return updateNote(DATABASE_TABLES.NOTES, note);
}

const removeSegmentIfNecessary = (segments : Array<INoteSegment>, removedSegmentIndexes : Array<number>) : Array<INoteSegment> => {
    const removedSegments : Array<INoteSegment> = segments.filter((segment, i) => removedSegmentIndexes.includes(i));
    segments = segments.filter((segment, i) => !removedSegmentIndexes.includes(i));

    removedSegments.forEach((segment : INoteSegment) => {
        if (segment.attachments && segment.attachments.length > 0)
            segment.attachments.forEach((attachment : IMedia | IFile) => {
                if (attachment.name) removeFileOnLocalStorage(attachment.name, attachment.type)
            });
    });

    return segments;
}