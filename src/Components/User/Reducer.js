import {
	LOADING_USER,
	LOGIN_SUCCESS_USER,
	ERROR_USER,
	LOGOUT_SUCCESS_USER,
	UPDATE_USER,
	UPDATE_USER_EMAIL,
	UPDATE_USER_PASSWORD,
	ADD_OTHER_USERS,
	SIGNUP_SUCCESS_USER
} from "./Actions"

const UserReducer = (state = {
	loading: false,
	authenticated: true,
	currentUser: { _id: "testUserId" },
	users: [{ _id: "testUserId", name: "userName", email: "test email" }]
}, action) => {
	let newState
	switch (action.type) {
		case LOADING_USER:
			newState = Object.assign({}, state, { loading: true })
			return newState
		case LOGIN_SUCCESS_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, currentUser: action.data })
		case SIGNUP_SUCCESS_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, currentUser: action.data })
		case LOGOUT_SUCCESS_USER:
			return Object.assign({}, state, {
				loading: false, authenticated: false, id: "", currentUser: {}
			})
		case UPDATE_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, currentUser: action.data.user })
		case UPDATE_USER_EMAIL:
			newState = Object.assign({}, state, { loading: false, authenticated: true })
			newState.currentUser.email = action.email
			return newState
		case UPDATE_USER_PASSWORD:
			newState = Object.assign({}, state, { loading: false, authenticated: true })
			newState.currentUser.salt = action.salt
			newState.currentUser.hash = action.hash
			return newState
		case ADD_OTHER_USERS:
			newState = Object.assign({}, state, { loading: false, authenticated: true })
			newState.users.concat(action.data)
			return newState
		case ERROR_USER:
			return Object.assign({}, state, { loading: false, authenticated: false })
		default:
			return state
	}
}

export default UserReducer