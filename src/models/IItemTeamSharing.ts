import { PERMISSIONS, TEAM_ROLES } from "../shared/enums";
import { IItemSharing } from './others';

interface IItemTeamSharing {
    id : number,
    items : Array<IItemSharing>,
    teamId : number,
    sharedOn : string,
    permissions : {
        role : TEAM_ROLES,
        permission : PERMISSIONS
    }
}

export default IItemTeamSharing;