import {actionTypes} from '../actions/GlobalActions'

export const InitialGlobalState = {
	globalLoaderActive: false
}

export const GlobalStateReducer = (state = InitialGlobalState, action) => {
	switch (action.type) {

	  	case actionTypes.TOGGLE_GLOBAL_LOADER_ON:
			return Object.assign({}, state, { globalLoaderActive: true })

	  	case actionTypes.TOGGLE_GLOBAL_LOADER_OFF:
			return Object.assign({}, state, { globalLoaderActive: false })

	  	default: return state
	}
}
