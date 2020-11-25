import * as settingsServices from './services';
import * as settingsConstants from './constants';

export const getAppSettings = () => {
    return (dispatch : any) => {
        dispatch({ type : settingsConstants.GET_DEFAULT_SETTINGS });

        settingsServices.getSettings()
            .then((result : any) => dispatch({
                type : settingsConstants.GET_SETTINGS_SUCCESS,
                payload : result
            }))
            .catch((error : any) => dispatch({
                type : settingsConstants.GET_SETTINGS_FAILED,
                error
            }));
    };
}
