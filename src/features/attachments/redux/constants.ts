import { IFile, IMedia } from '../../../models/others';
import { DATABASE_TABLES } from '../../../shared/enums';

export interface IAttachments {
    settings? : any,
    attachments : Array<IMedia | IFile>,
    removeLocalAttachment? : any,
    removalStatus : IRemovalStatus
}

export interface IRemovalStatus {
    id : number,
    progress : boolean | null | object | string
}

export const REMOVE_LOCAL_ATTACHMENT = 'REMOVE_LOCAL_ATTACHMENT';
export type T_REMOVE_LOCAL_ATTACHMENT = typeof REMOVE_LOCAL_ATTACHMENT;

export const REMOVE_LOCAL_ATTACHMENT_FAILED = 'REMOVE_LOCAL_ATTACHMENT_FAILED';
export type T_REMOVE_LOCAL_ATTACHMENT_FAILED = typeof REMOVE_LOCAL_ATTACHMENT_FAILED;

export const REMOVE_LOCAL_ATTACHMENT_SUCCESS = 'REMOVE_LOCAL_ATTACHMENT_SUCCESS';
export type T_REMOVE_LOCAL_ATTACHMENT_SUCCESS = typeof REMOVE_LOCAL_ATTACHMENT_SUCCESS;

export const ADD_LOCAL_ATTACHMENT = 'ADD_LOCAL_ATTACHMENT';
export type T_ADD_LOCAL_ATTACHMENT = typeof ADD_LOCAL_ATTACHMENT;

export const ADD_LOCAL_ATTACHMENT_FAILED = 'ADD_LOCAL_ATTACHMENT_FAILED';
export type T_ADD_LOCAL_ATTACHMENT_FAILED = typeof ADD_LOCAL_ATTACHMENT_FAILED;

export const ADD_LOCAL_ATTACHMENT_SUCCESS = 'ADD_LOCAL_ATTACHMENT_SUCCESS';
export type T_ADD_LOCAL_ATTACHMENT_SUCCESS = typeof ADD_LOCAL_ATTACHMENT_SUCCESS;

export const VIEW_ATTACHMENT = 'VIEW_ATTACHMENT';
export type T_VIEW_ATTACHMENT = typeof VIEW_ATTACHMENT;