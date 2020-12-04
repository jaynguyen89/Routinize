import { PERMISSIONS, TEAM_ROLES } from "../shared/enums";

interface IItemTeamSharing {
    id : number,
    itemId : number,
    teamId : number,
    sharedOn : string,
    permissions : {
        role : TEAM_ROLES,
        permission : PERMISSIONS
    }
}

export default IItemTeamSharing;