import { DATETIME_FORMATS, UNIT_SYSTEMS } from "../shared/enums";

interface ISettings {
    theme : string,
    isPremium : boolean,
    reminderUnlocked : boolean,
    todoUnlocked : boolean,
    notesUnlocked : boolean,
    shouldHideAds : boolean,
    premiumElapseTime : number, //Time in second
    dateTimeFormat : DATETIME_FORMATS,
    unitSystem : UNIT_SYSTEMS
}

export default ISettings;
