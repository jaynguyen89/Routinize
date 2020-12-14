import { ACTION_TYPES } from "./enums";
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { IFile, IMedia } from '../models/others';

export interface IAppDrawer {
    navigation : any,
    settings : any
}

export interface IButtonGroup {
    settings? : any
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
    }
}

export interface IEditor {
    settings? : any,
    callback : any
}