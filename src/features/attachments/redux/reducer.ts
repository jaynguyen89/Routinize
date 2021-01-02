import * as attachmentConstants from './constants';
import produce from 'immer';

import { EMPTY_STRING } from '../../../helpers/Constants';

interface IAttachmentStore {
    selection : object | null,
    atmRemoval : {
        action : string,
        removedId : number,
        segmentIndex? : number
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
            state.atmRemoval.removedId = action.payload.attachmentId;

            if (action.payload.segmentIndex > 0) state.atmRemoval.segmentIndex = action.payload.segmentIndex;
            return;
        case attachmentConstants.REMOVE_LOCAL_ATTACHMENT_FAILED:
            state.atmRemoval.action = attachmentConstants.REMOVE_LOCAL_ATTACHMENT_FAILED;
            state.atmRemoval.removedId = action.error;

            if (action.payload.segmentIndex > 0) state.atmRemoval.segmentIndex = action.payload.segmentIndex;
            return;
        case attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS:
            state.atmRemoval.action = attachmentConstants.REMOVE_LOCAL_ATTACHMENT_SUCCESS;
            state.atmRemoval.removedId = action.payload.attachmentId;

            if (action.payload.segmentIndex > 0) state.atmRemoval.segmentIndex = action.payload.segmentIndex;
            return;
        case attachmentConstants.RESET_ATTACHMENT_REMOVAL_STATUS:
            state.atmRemoval = { action : EMPTY_STRING, removedId : 0 };
            return;
        default:
            return;
    }
}, initialState);

export default reducer;