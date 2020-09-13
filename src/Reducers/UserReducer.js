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
	currentUser: "testUserId",
	users: [{ _id: "testUserId", name: "userName", email: "test email" }],
	errorMessage: ""
}, action) => {
	let newState
	switch (action.type) {
		case LOADING_USER:
			newState = Object.assign({}, state, { loading: true, authenticated: false })
			return newState
		case LOGIN_SUCCESS_USER:
			return Object.assign({}, state, { loading: false, authenticated: true, currentUser: action.data._id, users: [action.data] })
		case LOGOUT_SUCCESS_USER:
			return Object.assign({}, state, {
				loading: false, authenticated: false, currentUser: {}, users: []
			})
		case UPDATE_USER:

			//TODO bug
			newState = Object.assign({}, state, { loading: false, authenticated: true })
			const initialUsers = [...newState.users]
			newState.users = initialUsers.filter(item => item._id === action.data._id).push(action.data)
			return newState
		case UPDATE_USER_EMAIL:

			//TODO bug
			newState = Object.assign({}, state, { loading: false, authenticated: true })
			const userToUpdateEmail = { ...newState.currentUser, email: action.email }
			newState.currentUser = userToUpdateEmail
			let newUsersForEmail = newState.users.filter(item => item._id !== userToUpdateEmail._id)
			newUsersForEmail = newState.users.push(userToUpdatePassword)
			newState.users = newUsersForEmail
			return newState
		case UPDATE_USER_PASSWORD:
			//TODO bug

			newState = Object.assign({}, state, { loading: false, authenticated: true })
			const userToUpdatePassword = Object.assign({}, newState.currentUser, { password: action.password })
			newState.currentUser = userToUpdatePassword
			let newUsersForPassword = newState.users.filter(item => item._id !== userToUpdatePassword._id)
			newUsersForPassword = newState.users.push(userToUpdatePassword)
			newState.users = newUsersForPassword
			return newState
		case ADD_OTHER_USERS:
			newState = Object.assign({}, state, { loading: false, authenticated: true })
			newState.users = newState.users.concat(action.data)
			return newState
		case ERROR_USER:
			return Object.assign({}, state, { loading: false, authenticated: false, errorMessage: action.data })
		default:
			return state
	}
}

export default UserReducer