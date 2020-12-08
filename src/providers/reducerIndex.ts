import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import appDebugger from "../../root/debugger";
import authReducer from '../auth/redux/reducer';
import accountReducer from '../account/redux/reducer';
import settingsReducer from '../features/settings/redux/reducer';
import todoReducer from '../features/todo/redux/reducer';
import noteReducer from '../features/note/redux/reducer';

const reducers = combineReducers({
    authReducer,
    accountReducer,
    settingsReducer,
    todoReducer,
    noteReducer
});

const rootReducer = (state: any, action: any) => {
    return reducers(state, action);
};

let store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        appDebugger.createEnhancer!()
    )
);

export default store;
