import { PERMISSIONS } from "../shared/enums";

interface IItemCollabSharing {
    id : number,
    itemId : number,
    collaboratorId : number,
    sharedOn : string,
    permission : PERMISSIONS
}

export default IItemCollabSharing;
