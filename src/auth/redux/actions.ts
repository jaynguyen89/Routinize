import * as authConstants from './constants';
import * as authServices from './services';
import { IAuth } from '../../models/others';

export const getAuthData = () => {
    return (dispatch : any) => {
        dispatch({ type : authConstants.GET_AUTH_DATA });

        authServices.getLocalAuth()
            .then((result : IAuth) => dispatch({
                type : authConstants.GET_AUTH_DATA_SUCCESS,
                payload : result
            }))
            .catch(error => dispatch({
                type : authConstants.GET_AUTH_DATA_FAILED,
                error
            }));
    };
}