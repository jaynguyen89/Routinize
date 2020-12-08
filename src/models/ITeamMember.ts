import { PERMISSIONS, TEAM_ROLES } from "../shared/enums";

interface ITeamMember {
    id : number,
    teamId : number,
    memberId : number,
    role : TEAM_ROLES,
    permission : PERMISSIONS
}

export default ITeamMember;