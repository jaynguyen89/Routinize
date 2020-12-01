import { ACTION_TYPES } from "./enums";
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface IAppDrawer {
    navigation : any,
    settings : any
}
 export interface IDynamicButton {
     name? : string,
     icon : string | IconDefinition,
     callback : any,
     type : ACTION_TYPES
 }
