import { PERMISSIONS, TEAM_ROLES } from "../shared/enums";

interface ITeamMembers {
    id : number,
    teamId : number,
    memberId : number,
    role : TEAM_ROLES,
    permission : PERMISSIONS
}

export default ITeamMembers;