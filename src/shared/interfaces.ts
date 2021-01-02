import { ACTION_TYPES } from "./enums";
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { IFile, IMedia } from '../models/others';
import { IRemovalStatus } from '../features/attachments/redux/constants';

export interface IAppDrawer {
    navigation : any,
    settings : any
}

export interface IButtonGroup {
    settings? : any,
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
    settings? : any,
    actions : Array<IDynamicButton>
}

export interface IDTPicker {
    settings : any,
    date : string | null,
    time : string | null,
    actions : {
        dateAction : any,
        timeAction : any
    }
}

export interface IAttachmentsList {
    settings? : any,
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
    getContent : any,
    actions? : Array<{ callback : any, type : ACTION_TYPES }>
}

export interface IEditor {
    id? : number,
    settings? : any,
    initialContent : string,
    updateContent : any,
    placeHolder : string,
    extraActions : boolean,
    handleAttachmentAdding? : any,
    handlePlaceAdding? : any
    removeSegment? : any
}

export interface IRteDialog {
    settings? : any,
    type : string,
    actions : { done : any, cancel : any }
}

export interface IMessage {
    settings? : any,
    mainMessage : string,
    otherMessage : string
}

export interface IUrlAttacher {
    settings? : any,
    getUrl : any
}