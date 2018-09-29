export const actionTypes = {
	LOGIN: 'LOG_IN',
	LOGOUT: 'LOG_OUT'
}

export const _login = (userStateObj) => dispatch => {
  return dispatch({ type: actionTypes.LOGIN, userState: userStateObj })
}

export const _logout = () => dispatch => {
  return dispatch({ type: actionTypes.LOGOUT })
}
