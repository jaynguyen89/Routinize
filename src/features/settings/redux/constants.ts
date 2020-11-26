import { THEMES } from '../../../shared/enums';

export const GET_DEFAULT_SETTINGS = 'GET_DEFAULT_SETTINGS';
export type T_GET_DEFAULT_SETTINGS = typeof GET_DEFAULT_SETTINGS;

export const GET_SETTINGS_FAILED = 'GET_SETTINGS_FAILED';
export type T_GET_SETTINGS_FAILED = typeof GET_SETTINGS_FAILED;

export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export type T_GET_SETTINGS_SUCCESS = typeof GET_SETTINGS_SUCCESS;

export interface ISettings {
    theme : any,
    isPremium : boolean,
    reminderUnlocked : boolean,
    todoUnlocked : boolean,
    notesUnlocked : boolean,
    shouldHideAds : boolean,
    premiumElapseTime : number //Time in second,
}
