import {
	LOADING_USER,
	LOGIN_SUCCESS_USER,
	ERROR_USER,
	LOGOUT_SUCCESS_USER,
	UPDATE_USER,
	UPDATE_USER_EMAIL,
	UPDATE_USER_PASSWORD,
	ADD_OTHER_USERS,
} from "../Actions/UserActions"

const UserReducer = (state = {
	loading: false,
	authenticated: true,
	currentUser: { _id: "testUserId" },
	users: [{ _id: "testUserId", name: "userName", email: "test email" }]
}, action) => {
	let newState
	switch (action.type) {
		case LOADING_USER:
			newState = Object.assign({}, state, { loading: true, authenticated: false })
			return newState
		case LOGIN_SUCCESS_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, currentUser: action.data })
		case LOGOUT_SUCCESS_USER:
			return Object.assign({}, state, {
				loading: false, authenticated: false, currentUser: {}, users: []
			})
		case UPDATE_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, currentUser: action.data.user })
		case UPDATE_USER_EMAIL:
			newState = Object.assign({}, state, { loading: false, authenticated: true })
			const userToUpdateEmail = Object.assign({}, newState.currentUser, { email: action.email })
			newState.currentUser = userToUpdateEmail
			newState.users.filter(item => item._id === userToUpdateEmail._id)
			newState.users.push(userToUpdateEmail)
			return newState
		case UPDATE_USER_PASSWORD:
			newState = Object.assign({}, state, { loading: false, authenticated: true })
			const userToUpdatePassword = Object.assign({}, newState.currentUser, { password: action.password })
			newState.currentUser = userToUpdatePassword
			newState.users.filter(item => item._id === userToUpdatePassword._id)
			newState.users.push(userToUpdatePassword)
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