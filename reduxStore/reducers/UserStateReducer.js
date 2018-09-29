import {actionTypes} from '../actions/UserStateActions'

export const InitialUserState = {
	id: null,
	username: null,
	displayName: null,
	emails: []
}

export const UserStateReducer = (state = InitialUserState, action) => {
	switch (action.type) {
		case actionTypes.LOGOUT:
			return Object.assign({}, state, InitialUserState )

		case actionTypes.LOGIN:
			if (action.userState) {
				return Object.assign({}, state, action.userState)
			}
			return state

	  	default: return state
	}
}
