import INote from "../../../models/INote";
import INoteSegment from "../../../models/INoteSegment";
import { IFile, IMedia } from '../../../models/others';
import IAddress from '../../../models/IAddress';

export interface IActiveNotes {
    settings : any,
    items : INote,
    navigation : any,
    authStatus : boolean,
    getNotes : any,
    getLocalNotes : any,
    setNoteTypeToCreate : any,
    resetAttachmentRemovalStatus : any,
    setLocalNoteEmphasized : any,
    highlightNote : any
}

export interface INoteRow {
    settings : any,
    item : INote,
    navigation : any,
    setNoteDetailItem : any,
    resetAttachmentRemovalStatus : any,
    toggleHighlight : any
}

export interface INoteDetail {
    navigation : any,
    authStatus : boolean,
    settings? : any,
    item : INote,
    isPersonal : boolean,
    saveNote : any,
    updateNote : any,
    saveLocalNote : any,
    updateLocalNote : any
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

export const GOTO_NEW_NOTE_PERSONAL = 'GOTO_NEW_NOTE_PERSONAL';
export type T_GOTO_NEW_NOTE_PERSONAL = typeof GOTO_NEW_NOTE_PERSONAL;

export const SET_NOTE_DETAIL_ITEM = 'SET_NOTE_DETAIL_ITEM';
export type T_SET_NOTE_DETAIL_ITEM = typeof SET_NOTE_DETAIL_ITEM;

export const SAVE_LOCAL_NOTE = 'SAVE_LOCAL_NOTE';
export type T_SAVE_LOCAL_NOTE = typeof SAVE_LOCAL_NOTE;

export const SAVE_LOCAL_NOTE_FAILED = 'SAVE_LOCAL_NOTE_FAILED';
export type T_SAVE_LOCAL_NOTE_FAILED = typeof SAVE_LOCAL_NOTE_FAILED;

export const SAVE_LOCAL_NOTE_SUCCESS = 'SAVE_LOCAL_NOTE_SUCCESS';
export type T_SAVE_LOCAL_NOTE_SUCCESS = typeof SAVE_LOCAL_NOTE_SUCCESS;

export const UPDATE_LOCAL_NOTE = 'UPDATE_LOCAL_NOTE';
export type T_UPDATE_LOCAL_NOTE = typeof UPDATE_LOCAL_NOTE;

export const UPDATE_LOCAL_NOTE_FAILED = 'UPDATE_LOCAL_NOTE_FAILED';
export type T_UPDATE_LOCAL_NOTE_FAILED = typeof UPDATE_LOCAL_NOTE_FAILED;

export const UPDATE_LOCAL_NOTE_SUCCESS = 'UPDATE_LOCAL_NOTE_SUCCESS';
export type T_UPDATE_LOCAL_NOTE_SUCCESS = typeof UPDATE_LOCAL_NOTE_SUCCESS;

export const GET_ALL_LOCAL_NOTES = 'GET_ALL_LOCAL_NOTES';
export type T_GET_ALL_LOCAL_NOTES = typeof GET_ALL_LOCAL_NOTES;

export const GET_ALL_LOCAL_NOTES_FAILED = 'GET_ALL_LOCAL_NOTES_FAILED';
export type T_GET_ALL_LOCAL_NOTES_FAILED = typeof GET_ALL_LOCAL_NOTES_FAILED;

export const GET_ALL_LOCAL_NOTES_SUCCESS = 'GET_ALL_LOCAL_NOTES_SUCCESS';
export type T_GET_ALL_LOCAL_NOTES_SUCCESS = typeof GET_ALL_LOCAL_NOTES_SUCCESS;

export const HIGHLIGHT_LOCAL_NOTE_SUCCESS = 'HIGHLIGHT_LOCAL_NOTE_SUCCESS';
export type T_HIGHLIGHT_LOCAL_NOTE_SUCCESS = typeof HIGHLIGHT_LOCAL_NOTE_SUCCESS;

export const HIGHLIGHT_LOCAL_NOTE_FAILED = 'HIGHLIGHT_LOCAL_NOTE_FAILED';
export type T_HIGHLIGHT_LOCAL_NOTE_FAILED = typeof HIGHLIGHT_LOCAL_NOTE_FAILED;