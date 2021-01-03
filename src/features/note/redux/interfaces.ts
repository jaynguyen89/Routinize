import INote from '../../../models/INote';
import INoteSegment from '../../../models/INoteSegment';
import { IFile, IMedia } from '../../../models/others';
import IAddress from '../../../models/IAddress';

export interface IActiveNotes {
    settings : any,
    items : INote,
    navigation : any,
    authStatus : boolean,
    getNotes : {
        action : string,
        items : Array<INote> | object
    },
    highlightNote : {
        action : string,
        result : boolean | object | null
    },
    deleteNote : {
        action : string,
        result : boolean | null
    },
    getLocalNotes : () => void,
    setNoteTypeToCreate : (isPersonal : boolean) => void,
    resetAttachmentRemovalStatus : () => void,
    setLocalNoteEmphasized : (itemId : number, isEmphasized : boolean) => void,
    deleteLocalNote : (item : INote) => void
}

export interface INoteRow {
    settings : any,
    item : INote,
    navigation : any,
    setNoteDetailItem : (item : INote) => void,
    resetAttachmentRemovalStatus : () => void,
    toggleHighlight : (itemId : number, isEmphasized : boolean) => void,
    deleteNote : (item : INote) => void
}

export interface INoteDetail {
    navigation : any,
    authStatus : boolean,
    settings? : any,
    item : INote,
    isPersonal : boolean,
    saveNote : {
        action : string,
        newNoteId : number | object
    },
    updateNote : {
        action : string,
        result : boolean | object
    },
    saveLocalNote : (note : INote, removedSegmentIndexes : Array<number>) => void,
    updateLocalNote : (note : INote, removedSegmentIndexes : Array<number>) => void
}

export interface INoteSegmentCard {
    settings? : any,
    segmentIndex : number,
    segment : INoteSegment,
    atmRemoval : {
        action : string,
        removedId : number,
        segmentIndex? : number
    },
    removeSegment : (segmentIndex : number) => void,
    removeLocalAttachment : (attachmentId : number, segmentIndex : number) => any,
    updateNoteSegment : (
        segmentIndex : number, field : string,
        data : string | IMedia | IFile | IAddress | null | Array<IMedia | IFile | IAddress>
    ) => void
}