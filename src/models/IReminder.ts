import IThing from "./IThing";
import INotificationPreference from "./INotificationPreference";
import INoteSegment from "./INoteSegment";

interface IReminder extends IThing {
    endDate : string | null,
    content : INoteSegment,
    isActive : boolean,
    notificationPref : INotificationPreference
}

export default IReminder;

export interface IReminderSharing {

}
