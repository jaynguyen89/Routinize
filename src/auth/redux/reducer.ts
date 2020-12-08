import * as authConstants from './constants';
import produce from 'immer';
import { IAuth } from '../../models/others';

interface IAuthStore {
    isRetrieving : boolean,
    isSuccess : boolean,
    auth : {
        isLocal : boolean,
        data : IAuth
    } | null | string
}

const initialState : IAuthStore = {
    isRetrieving : true,
    isSuccess : false,
    auth : null
};

const reducer = produce((state, action) => {
    switch (action.type) {
        case authConstants.GET_AUTH_DATA:
            state.isRetrieving = true;
            state.isSuccess = false;
            state.auth = null;
            return;
        case authConstants.GET_AUTH_DATA_FAILED:
            state.isRetrieving = false;
            state.isSuccess = false;
            state.auth = action.error.message;
            return;
        case authConstants.GET_AUTH_DATA_SUCCESS:
            state.isRetrieving = false;
            state.isSuccess = true;
            state.auth = {
                isLocal : true,
                data : action.payload
            };
            return;
        default:
            return;
    }
}, initialState);

export default reducer;