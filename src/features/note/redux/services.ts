import _ from 'lodash';
import { deleteEntry, executeRaw, insertNote, updateNote } from '../../../providers/databaseReader';
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
    return executeRaw(
        `SELECT N.*, S.id as segmentId, ` +
        `S.body, A.id as attachmentId, A.type, ` +
        `A.name, A.url, P.id as placeId, AD.addressName, ` +
        `AD.building, AD.street, AD.suburb, AD.postcode, ` +
        `AD.state, AD.country, AD.latitude, AD.longitude ` +
        `FROM ${ DATABASE_TABLES.NOTES } N ` +
        `LEFT JOIN ${ DATABASE_TABLES.SEGMENTS } S ON N.id = S.noteId ` +
        `LEFT JOIN ${ DATABASE_TABLES.ATTACHMENTS } A ON A.assetType = '${ DATABASE_TABLES.SEGMENTS }' AND A.assetId = S.id ` +
        `LEFT JOIN ${ DATABASE_TABLES.PLACES } P ON P.assetId = S.id AND P.assetType = '${ DATABASE_TABLES.SEGMENTS }' ` +
        `LEFT JOIN ${ DATABASE_TABLES.ADDRESS } AD ON P.addressId = AD.id ` +
        `ORDER BY N.id ASC, S.id ASC;`
    );
}

export const updateLocalNoteToDb = (note : INote, removedSegmentIndexes : Array<number>) : Promise<boolean> => {
    note.segments = removeSegmentIfNecessary(note.segments, removedSegmentIndexes);
    return updateNote(DATABASE_TABLES.NOTES, note);
}

const removeSegmentIfNecessary = (segments : Array<INoteSegment>, removedSegmentIndexes : Array<number>) : Array<INoteSegment> => {
    const removedSegments : Array<INoteSegment> = segments.filter((segment, i) => removedSegmentIndexes.includes(i));
    segments = segments.filter((segment, i) => !removedSegmentIndexes.includes(i));

    removedSegments.forEach((segment : INoteSegment) => {
        if (segment.attachments && segment.attachments.length > 0)
            segment.attachments.forEach((attachment : IMedia | IFile) => {
                if (attachment.name) removeFileOnLocalStorage(attachment.name, attachment.type);

                if (segment.id !== 0 && attachment.url)
                    deleteEntry(DATABASE_TABLES.ATTACHMENTS, attachment.id)
                        .then(response => console.log('Removed attachment #' + attachment.id));
            });

        if (segment.id !== 0)
            deleteEntry(DATABASE_TABLES.SEGMENTS, segment.id)
                .then(result => console.log('Removed segment #' + segment.id));
    });

    return segments;
}