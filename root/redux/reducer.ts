import * as rootConstants from './constants';
import produce from 'immer';

interface IRoot {
    authStatus : boolean
}

const initialState : IRoot = {
    authStatus : false
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case rootConstants.SET_AUTH_STATUS:
            state.authStatus = action.payload;
        default:
            return;
    }
}, initialState);

export default reducer;