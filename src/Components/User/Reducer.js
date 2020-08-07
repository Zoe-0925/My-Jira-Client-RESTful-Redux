import {
	LOADING_USER,
	LOGIN_SUCCESS_USER,
	ERROR_USER,
	SIGNUP_USER,
	SIGNUP_SUCCESS_USER,
	LOGOUT_USER,
	LOGOUT_SUCCESS_USER,
} from "./Actions"

const user = (state = {
	loading: false,
	authenticated: false,
	id: "",
	user: {}
}, action) => {
	switch (action.type) {
		case LOADING_USER:
		return Object.assign({}, state, { loading: true })
		case LOGIN_SUCCESS_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, user: action.data.user })
		case SIGNUP_SUCCESS_USER:
			return Object.assign({}, state, { loading: false, authenticated: true })
		case LOGOUT_SUCCESS_USER:
			return Object.assign({}, state, {
				loading: false, authenticated: false, id: "", user: {}
			})
		case ERROR_USER:
			return Object.assign({}, state, { loading: false, authenticated: false })
		default:
			return state
	}
}

export default user