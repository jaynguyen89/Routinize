import { ADDRESS_FORMAT, DATETIME_FORMATS, THEMES, UNIT_SYSTEMS } from '../shared/enums';

interface ISettings {
    theme : THEMES,
    isPremium : boolean,
    todoUnlocked : boolean, //For Marking Important
    notesUnlocked : boolean, //For Highlighting, Archiving, Random Ideas
    collabUnlocked : boolean, //For whole feature
    shouldHideAds : boolean, //Watch Ads 5 times to hide Ads for 24h
    premiumUntil : string | null, //For subscription, end-of-premium datetime
    unlockedUntil : string | null, //End-of-unlocking datetime, only unlock features, do not hide ads, watch Ads 5 times to unlock for 1 day
    dateTimeFormat : DATETIME_FORMATS,
    unitSystem : UNIT_SYSTEMS,
    addressFormat : ADDRESS_FORMAT
}

export default ISettings;
