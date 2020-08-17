import {
	LOADING_USER,
	LOGIN_SUCCESS_USER,
	ERROR_USER,
	LOGOUT_SUCCESS_USER,
	UPDATE_USER,
	UPDATE_USER_EMAIL,
	UPDATE_USER_PASSWORD
} from "./Actions"

const UserReducer = (state = {
	loading: false,
	authenticated: false,
	id: "",
	user: {}
}, action) => {
	let newState
	switch (action.type) {
		case LOADING_USER:
			newState = Object.assign({}, state, { loading: true })
			return newState
		case LOGIN_SUCCESS_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, user: action.data })
		case LOGOUT_SUCCESS_USER:
			return Object.assign({}, state, {
				loading: false, authenticated: false, id: "", user: {}
			})
		case UPDATE_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, user: action.data.user })
		case UPDATE_USER_EMAIL:
			newState = Object.assign({}, state, { loading: false, authenticated: true })
			newState.user.email = action.email
			return newState
		case UPDATE_USER_PASSWORD:
			newState = Object.assign({}, state, { loading: false, authenticated: true })
			newState.user.salt = action.salt
			newState.user.hash = action.hash
			return newState
		case ERROR_USER:
			return Object.assign({}, state, { loading: false, authenticated: false })
		default:
			return state
	}
}

export default UserReducer