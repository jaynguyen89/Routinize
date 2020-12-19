import * as attachmentConstants from './constants';
import produce from 'immer';
import { EMPTY_STRING } from '../../../helpers/Constants';
import { IFile, IMedia } from '../../../models/others';

interface IAttachmentStore {
    selection : object | null,
    removal : {
        action : string,
        removedId : number | object
    }
}

const initialState : IAttachmentStore = {
    selection : null,
    removal : {
        action : EMPTY_STRING,
        removedId : 0
    }
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case attachmentConstants.REMOVE_LOCAL_ATTACHMENT:
            state.removal.action = attachmentConstants.REMOVE_LOCAL_ATTACHMENT;
            state.removal.removedId = action.payload;
            return;
        case attachmentConstants.REMOVE_LOCAL_ATTACHMENT_FAILED:
            state.removal.action = attachmentConstants.REMOVE_LOCAL_ATTACHMENT_FAILED;
            state.removal.removedId = action.error;
            return;
        case attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS:
            state.removal.action = attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS;
            state.removal.removedId = action.payload;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;