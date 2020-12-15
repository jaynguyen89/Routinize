import INote from "../../../models/INote";
import INoteSegment from "../../../models/INoteSegment";
import { EMPTY_STRING } from '../../../helpers/Constants';

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

export interface INoteSegmentCard {
    settings? : any,
    segment : INoteSegment,
    removeSegment : any
}

export const EMPTY_SEGMENT : INoteSegment = {
    id : 0,
    body : EMPTY_STRING,
    attachments : null,
    places : null
}

export const GOTO_NEW_NOTE_PERSONAL = 'GOTO_NEW_NOTE_PERSONAL';
export type T_GOTO_NEW_NOTE_PERSONAL = typeof GOTO_NEW_NOTE_PERSONAL;

export const SET_NEW_TODO_DETAIL_ITEM = 'SET_NEW_TODO_DETAIL_ITEM';
export type T_SET_NEW_TODO_DETAIL_ITEM = typeof SET_NEW_TODO_DETAIL_ITEM;
