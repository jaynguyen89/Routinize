import * as attachmentConstants from './constants';
import * as attachmentServices from './services';

export const removeLocalAttachment = (attachmentId : number) => {
    return (dispatch : any) => {
        dispatch({
            type : attachmentConstants.REMOVE_LOCAL_ATTACHMENT,
            payload : attachmentId
        });

        attachmentServices.removeLocalAttachment(attachmentId)
            .then(response => dispatch({
                type : attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS,
                payload : attachmentId
            }))
            .catch(error => dispatch({
                type : attachmentConstants.REMOVE_LOCAL_ATTACHMENT_FAILED,
                error
            }));
    };
}