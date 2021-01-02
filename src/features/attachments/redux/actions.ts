import * as attachmentConstants from './constants';
import * as attachmentServices from './services';

export const removeLocalAttachment = (attachmentId : number, segmentIndex : number = -1) => {
    return (dispatch : any) => {
        dispatch({
            type : attachmentConstants.REMOVE_LOCAL_ATTACHMENT,
            payload : { attachmentId, segmentIndex }
        });

        attachmentServices.removeLocalAttachment(attachmentId)
            .then(response => dispatch({
                type : attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS,
                payload : { attachmentId, segmentIndex }
            }))
            .catch(error => dispatch({
                type : attachmentConstants.REMOVE_LOCAL_ATTACHMENT_FAILED,
                error
            }));
    };
}

export const resetAttachmentRemovalStatus = () => {
    return (dispatch : any) => dispatch({
        type : attachmentConstants.RESET_ATTACHMENT_REMOVAL_STATUS
    });
}