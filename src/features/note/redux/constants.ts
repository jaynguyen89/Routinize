import INote from "../../../models/INote";
import INoteSegment from "../../../models/INoteSegment";
import { EMPTY_STRING } from '../../../helpers/Constants';
import { IFile, IMedia } from '../../../models/others';
import IAddress from '../../../models/IAddress';

export interface IActiveNotes {
    settings : any,
    items : INote,
    navigation : any,
    authStatus : boolean,
    setNoteTypeToCreate : any
}

export interface INoteRow {
    settings : any,
    item : INote,
    navigation : any,
    setNoteDetailItem : any
}

export interface INoteDetail {
    navigation : any,
    authStatus : boolean,
    settings? : any,
    item : INote,
    isPersonal : boolean
}

export interface INoteSharing {
    settings? : any
}

export interface INoteSegmentCard {
    settings? : any,
    segmentIndex : number,
    segment : INoteSegment,
    removeSegment : any,
    removeLocalAttachment : any,
    atmRemoval : any,
    updateNoteSegment : (segmentIndex : number, field : string, data : string | IMedia | IFile | IAddress | null | Array<IMedia | IFile | IAddress>) => void
}

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

export const GOTO_NEW_NOTE_PERSONAL = 'GOTO_NEW_NOTE_PERSONAL';
export type T_GOTO_NEW_NOTE_PERSONAL = typeof GOTO_NEW_NOTE_PERSONAL;

export const SET_NOTE_DETAIL_ITEM = 'SET_NOTE_DETAIL_ITEM';
export type T_SET_NOTE_DETAIL_ITEM = typeof SET_NOTE_DETAIL_ITEM;
