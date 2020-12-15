import * as accountConstants from './constants';
import * as accountServices from './services';
import IAccount from '../../models/IAccount';

export const getLocalAccount = () => {
    return (dispatch : any) => {
        dispatch({ type : accountConstants.GET_USER_ACCOUNT });

        accountServices.getLocalUserAccount()
            .then((result : IAccount) => dispatch({
                type : accountConstants.GET_USER_ACCOUNT_SUCCESS,
                payload : result
            }))
            .catch(error => dispatch({
                type : accountConstants.GET_USER_ACCOUNT_FAILED,
                error
            }))
    };
}