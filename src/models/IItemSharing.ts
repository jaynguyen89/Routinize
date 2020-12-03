import { PERMISSIONS } from "../shared/enums";

interface IItemSharing {
    id : number,
    itemId : number,
    collaboratorId : number,
    sharedOn : string,
    permission : PERMISSIONS
}

export default IItemSharing;
