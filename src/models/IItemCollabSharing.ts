import { PERMISSIONS } from "../shared/enums";
import { IItemSharing } from './others';

interface IItemCollabSharing {
    id : number,
    items : Array<IItemSharing>,
    collaboratorId : number,
    sharedOn : string,
    permission : PERMISSIONS
}

export default IItemCollabSharing;
