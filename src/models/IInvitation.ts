import { INVITATION_STATUS } from '../shared/enums';

interface IInvitation {
    id : number,
    invitorId : number,
    inviteeId : number,
    invitedOn : string,
    status : INVITATION_STATUS
}

export default IInvitation;