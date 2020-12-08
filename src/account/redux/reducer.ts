import * as accountConstants from './constants';
import produce from 'immer';
import IAccount from '../../models/IAccount';
import ILocalAccount from '../../models/local/IAccount';

interface IAccountStore {
    isRetrieving : boolean,
    isSuccess : boolean,
    account : IAccount | ILocalAccount | null | string
}

const initialState : IAccountStore = {
    isRetrieving : true,
    isSuccess : false,
    account : null
};

const reducer = produce((state, action) => {
    switch (action.type) {
        case accountConstants.GET_USER_ACCOUNT:
            state.isRetrieving = true;
            state.isSuccess = false;
            state.account = null;
            return;
        case accountConstants.GET_USER_ACCOUNT_FAILED:
            state.isRetrieving = false;
            state.isSuccess = false;
            state.account = action.error.message;
            return;
        case accountConstants.GET_USER_ACCOUNT_SUCCESS:
            state.isRetrieving = false;
            state.isSuccess = true;
            state.account = action.payload;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;