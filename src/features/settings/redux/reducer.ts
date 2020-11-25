import * as settingsConstants from './constants';
import produce from 'immer';

interface ISettingsStore {
    appSettings : {
        isRetrieving : boolean,
        isSuccess : boolean,
        settings : settingsConstants.ISettings | null
    }
}

const initialState : ISettingsStore = {
    appSettings : {
        isRetrieving : false,
        isSuccess : false,
        settings : null
    }
}

const reducer = produce((draft, action) => {
    switch (action.type) {
        case settingsConstants.GET_DEFAULT_SETTINGS:
            draft.appSettings.isRetrieving = true;
            draft.appSettings.isSuccess = false;
            draft.appSettings.settings = null;
            return;
        case settingsConstants.GET_SETTINGS_FAILED:
            draft.appSettings.isRetrieving = false;
            draft.appSettings.isSuccess = false;
            draft.appSettings.settings = action.error;
            return;
        case settingsConstants.GET_SETTINGS_SUCCESS:
            draft.appSettings.isRetrieving = false;
            draft.appSettings.isSuccess = true;
            draft.appSettings.settings = action.payload;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
