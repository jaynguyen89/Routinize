import { ICoordination } from "./IAddress";
import ITodo from "./ITodo";

interface INotificationPreference {
    locationBased : boolean,
    locationToRemind : ICoordination | null,
    timeBased : boolean,
    timeToRemind : string | null,
    taskBased : boolean,
    taskToRemind : ITodo | null,

}

export default INotificationPreference;
