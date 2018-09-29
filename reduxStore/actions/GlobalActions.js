export const actionTypes = {
	TOGGLE_GLOBAL_LOADER_ON: 'TOGGLE_GLOBAL_LOADER_ON',
	TOGGLE_GLOBAL_LOADER_OFF: 'TOGGLE_GLOBAL_LOADER_OFF'
}

export const _enableGlobalLoader = () => dispatch => {
  return dispatch({ type: actionTypes.TOGGLE_GLOBAL_LOADER_ON })
}

export const _disableGlobalLoader = () => dispatch => {
  return dispatch({ type: actionTypes.TOGGLE_GLOBAL_LOADER_OFF })
}
