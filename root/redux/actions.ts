import * as rootConstants from './constants';

export const setAuthStatus = (status : boolean) => {
    return (dispatch : any) => dispatch({
        type : rootConstants.SET_AUTH_STATUS,
        payload : status
    });
}