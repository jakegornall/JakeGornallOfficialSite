import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { _enableGlobalLoader, _disableGlobalLoader } from './actions/GlobalActions';
import { _login, _logout } from './actions/UserStateActions';
import { GlobalStateReducer, InitialGlobalState } from './reducers/GlobalReducer';
import { UserStateReducer, InitialUserState } from './reducers/UserStateReducer';

const InitialState = {
	globalState: InitialGlobalState,
	userState: InitialUserState
}

const rootReducer = combineReducers({
	globalState: GlobalStateReducer,
	userState: UserStateReducer
})

export function initializeStore (initialState = InitialState) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

export const enableGlobalLoader = _enableGlobalLoader;
export const disableGlobalLoader = _disableGlobalLoader;
export const login = _login;
export const logout = _logout;

