import * as attachmentConstants from './constants';
import produce from 'immer';
import { EMPTY_STRING } from '../../../helpers/Constants';
import { IFile, IMedia } from '../../../models/others';

interface IAttachmentStore {
    selection : object | null,
    atmRemoval : {
        action : string,
        removedId : number | object
    }
}

const initialState : IAttachmentStore = {
    selection : null,
    atmRemoval : {
        action : EMPTY_STRING,
        removedId : 0
    }
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case attachmentConstants.REMOVE_LOCAL_ATTACHMENT:
            state.atmRemoval.action = attachmentConstants.REMOVE_LOCAL_ATTACHMENT;
            state.atmRemoval.removedId = action.payload;
            return;
        case attachmentConstants.REMOVE_LOCAL_ATTACHMENT_FAILED:
            state.atmRemoval.action = attachmentConstants.REMOVE_LOCAL_ATTACHMENT_FAILED;
            state.atmRemoval.removedId = action.error;
            return;
        case attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS:
            state.atmRemoval.action = attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS;
            state.atmRemoval.removedId = action.payload;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;