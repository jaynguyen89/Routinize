import { ACTION_TYPES } from "./enums";
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { IFile, IMedia } from '../models/others';
import { IRemovalStatus } from '../features/attachments/redux/constants';

export interface ISettingData {
    collabUnlocked : boolean,
    dateTimeFormat : string,
    isPremium : boolean,
    notesUnlocked : boolean,
    premiumUntil : boolean,
    shouldHideAds : boolean,
    theme : {
        btnPrimary : {
            backgroundColor : string,
            color : string,
            borderColor : string
        },
        btnDisabled : {
            backgroundColor : string,
            color : string,
            borderColor : string
        },
        backgroundPrimary : {
            backgroundColor : string,
            color : string
        },
        backgroundSecondary : {
            backgroundColor : string,
            color : string
        },
        shadow : string,
        textFill : { color : string },
        invert : { backgroundColor : string },
        danger : {
            backgroundColor : string,
            color : string
        },
        black : { color : string },
        border : {
            borderColor : string,
            borderWidth : number
        }
    },
    todoUnlocked : boolean,
    unitSystem : number,
    unlockedUntil : string | null
}

export interface IAppDrawer {
    navigation : any,
    settings : ISettingData
}

export interface IButtonGroup {
    settings : ISettingData,
    vertical? : boolean,
    actions : Array<IDynamicButton>
}

export interface IDynamicButton {
    name? : string,
    icon? : string | IconDefinition,
    callback : any,
    type : ACTION_TYPES
}

export interface IPopoverContent {
    settings : ISettingData,
    actions : Array<IDynamicButton>
}

export interface IDTPicker {
    settings : ISettingData,
    date : string | null,
    time : string | null,
    actions : {
        dateAction : any,
        timeAction : any
    }
}

export interface IAttachmentsList {
    settings : ISettingData,
    attachments : Array<IMedia | IFile>
    actions : {
        viewAttachment : any,
        removeAttachment : any
    },
    removal : IRemovalStatus,
    segmentIndex? : number
}

export interface ITextArea {
    withButtons? : boolean,
    buttonsVertical? : boolean,
    placeHolder : string,
    initialContent : string,
    getContent : (content : string) => void,
    actions? : Array<{ callback : any, type : ACTION_TYPES }>
}

export interface IEditor {
    id? : number,
    settings : ISettingData,
    initialContent : string,
    updateContent : any,
    placeHolder : string,
    extraActions : boolean,
    handleAttachmentAdding? : any,
    handlePlaceAdding? : any
    removeSegment? : any
}

export interface IRteDialog {
    settings : ISettingData,
    type : string,
    actions : {
        done : (url : string, type : string) => void,
        cancel : () => void
    }
}

export interface IMessage {
    settings : ISettingData,
    mainMessage : string,
    otherMessage : string
}

export interface IUrlAttacher {
    settings : ISettingData,
    getUrl : (url : any) => void
}

export interface IFlatDTPicker {
    settings : ISettingData,
    title : string,
    values : {
        minDate : Date,
        maxDate : Date,
        default : Date
    },
    callback : (date : string) => void
}