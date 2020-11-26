import * as settingsConstants from './constants';
import produce from 'immer';
import { THEMES } from "../../../shared/enums";
import { dayTheme, nightTheme, seaTheme, skyTheme } from "../../../shared/styles";

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

const reducer = produce((state, action) => {
    switch (action.type) {
        case settingsConstants.GET_DEFAULT_SETTINGS:
            state.appSettings.isRetrieving = true;
            state.appSettings.isSuccess = false;
            state.appSettings.settings = null;
            return;
        case settingsConstants.GET_SETTINGS_FAILED:
            state.appSettings.isRetrieving = false;
            state.appSettings.isSuccess = false;
            state.appSettings.settings = action.error;
            return;
        case settingsConstants.GET_SETTINGS_SUCCESS:
            state.appSettings.isRetrieving = false;
            state.appSettings.isSuccess = true;
            state.appSettings.settings = action.payload;

            state.appSettings.settings.theme = action.payload === THEMES.DAY ? dayTheme : (
                action.payload === THEMES.NIGHT ? nightTheme : (
                    action.payload === THEMES.SEA ? seaTheme : skyTheme
                )
            );
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
