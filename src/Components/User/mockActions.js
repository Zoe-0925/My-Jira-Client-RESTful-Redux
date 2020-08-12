import history from "../../history"
export const ERROR_USER = "ERROR_USER"
export const LOADING_USER = "LOADING_USER"
export const LOGIN_SUCCESS_USER = "LOGIN_SUCCESS_USER"
export const SIGNUP_SUCCESS_USER = "SIGNUP_SUCCESS_USER"
export const LOGOUT_SUCCESS_USER = "LOGOUT_SUCCESS_USER"
export const UPDATE_USER_INFO = "UPDATE_USER_INFO"
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL"
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD"
export const UPDATE_USER = "UPDATE_USER"

export const CREATE_USER = "CREATE_USER"

//TODO - do we need them???
export const GET_USER_BY_ID = "GET_USER_BY_ID"  // => login
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL"  // => login
export const DELETE_USER = "UPDATE_USER"
//export const CHECK_EMAIL_EXIST = "CHECK_EMAIL_EXIST"
//-------------------------------------------------------



function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS_USER,
        data
    }
}

export function dispatchError(data) {
    return {
        type: ERROR_USER,
        data: data
    }
}

export function updateUser(data) {
    return {
        type: UPDATE_USER,
        data: data
    }
}

//TODO check...
export function update(data) {
    return {
        type: UPDATE,
        data: data
    }
}


const mockUser = {
    name: "mock user name",
    email: "mockEmail@gmail.com",
    hash: "mock hash",
    salt: "mock salt"
}
/******************* Thunk Actions  *****************************/
export async function manualLogin(
    data,
    successPath, // path to redirect to upon successful log in
    token
) {
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        dispatch(loginSuccess(mockUser))
        history.push(successPath)
    }
}

export async function manualLogout(data, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        dispatch({ type: LOGOUT_SUCCESS_USER })
        history.push("./login")
    }
}

//TODO need to update here to connect passport and 3rd party register
export async function manualSignup(data, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        data._id = uuidv4()
        dispatch({ type: SIGNUP_SUCCESS_USER })
        dispatch(manualLogin(data, "/projects"))
    }
}

export async function updateInfo(data, token) { // data = {name:"..."}
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        let newData = Object.assign({}, mockUser)
        newData.name = data.name
        dispatch(update(newData))
    }
}

export async function updateEmail(data, token) {// data = {email:"..."}
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        let newData = Object.assign({}, mockUser)
        newData.email = data.email
        dispatch(update(newData))
    }
}

export async function updatePassword(data, token) {//data = {password:"..."}
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        let newData = Object.assign({}, mockUser)
        newData.hash = "updated hash"
        newData.salt = "updated salt"
        dispatch(update(newData))
    }
}
