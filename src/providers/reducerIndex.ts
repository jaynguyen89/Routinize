import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import settingsReducer from '../features/settings/redux/reducer';

const reducers = combineReducers({
    settingsReducer
});

const rootReducer = (state: any, action: any) => {
    return reducers(state, action);
};

let store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk)
    )
);

export default store;
