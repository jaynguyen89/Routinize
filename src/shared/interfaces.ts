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
        removeAttachment : (attachmentId : number, segmentIndex? : number) => void
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
    actions : {
        done : (url : string, type : string) => void,
        cancel : () => void
    }
}

export interface IMessage {
    settings? : any,
    mainMessage : string,
    otherMessage : string
}

export interface IUrlAttacher {
    settings? : any,
    getUrl : (url : any) => void
}

export interface IFlatDTPicker {
    settings? : any,
    title : string,
    values : {
        minDate : Date,
        maxDate : Date,
        default : Date
    },
    callback : (date : string) => void
}