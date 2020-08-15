import {
	LOADING_USER,
	LOGIN_SUCCESS_USER,
	ERROR_USER,
	LOGOUT_SUCCESS_USER,
	UPDATE_USER
} from "./Actions"

const UserReducer = (state = {
	loading: false,
	authenticated: false,
	id: "",
	user: {}
}, action) => {
	switch (action.type) {
		case LOADING_USER:
			newState = Object.assign({}, state, { loading: true })
		case LOGIN_SUCCESS_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, user: action.data })
		case LOGOUT_SUCCESS_USER:
			return Object.assign({}, state, {
				loading: false, authenticated: false, id: "", user: {}
			})
		case UPDATE_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, user: action.data.user })
		case ERROR_USER:
			return Object.assign({}, state, { loading: false, authenticated: false })
		default:
			return state
	}
}

export default UserReducer