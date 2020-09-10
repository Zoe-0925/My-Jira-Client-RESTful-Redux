import { v4 as uuidv4 } from 'uuid'

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
export const ADD_OTHER_USERS = "ADD_OTHER_USERS"

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
        data: data
    }
}

function dispatchSignupSuccess(data) {
    return {
        type: SIGNUP_SUCCESS_USER,
        data: data
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

export function dispatchUpdateEmail(email) {
    return {
        type: UPDATE_USER_EMAIL,
        email: email
    }
}

export function dispatchUpdatePassword(salt, hash) {
    return {
        type: UPDATE_USER_PASSWORD,
        salt: salt,
        hash: hash
    }
}

export function dispatchAddOtherUsers(userList) {
    return {
        type: ADD_OTHER_USERS,
        data: userList
    }
}

const mockUser = { _id: "testUserId", name: "userName", email: "test email", salt: "test salt", hash: "test hash" }

/******************* Thunk Actions  *****************************/
export  function manualLogin(
    data,
    successPath, // path to redirect to upon successful log in
) {
    return dispatch => {
        dispatch({ type: LOADING_USER })
        localStorage.setItem("token", "test token")
        const newData = { _id: uuidv4(), email: data.email, name: "test name", project: ["test id"] }
        dispatch(loginSuccess(newData))
        history.push(successPath)
    }
}

export  function manualLogout(data) {
    return dispatch => {
        dispatch({ type: LOADING_USER })
        dispatch({ type: LOGOUT_SUCCESS_USER })
        history.push("./login")
    }
}

//TODO need to update here to connect passport and 3rd party register
export function manualSignup(data, token) {
    return dispatch => {
        dispatch({ type: LOADING_USER })
        const newData = { _id: uuidv4(), email: data.email, name: data.name, projects: data.projects }
        dispatch(dispatchSignupSuccess(newData))
        history.push("/projects")
    }
}

export function updateInfo(data, token) { // data = {name:"..."}
    return dispatch => {
        dispatch({ type: LOADING_USER })
        let newData = Object.assign({}, mockUser)
        newData.name = data.name
        dispatch(updateUser(newData))
    }
}

export function updateEmail(data, token) {// data = {email:"..."}
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        let newData = Object.assign({}, mockUser)
        newData.email = data.email
        dispatch(dispatchUpdateEmail(newData))
    }
}

export function updatePassword(data, token) {//data = {password:"..."}
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        let newData = Object.assign({}, mockUser)
        newData.hash = "updated hash"
        newData.salt = "updated salt"
        dispatch(dispatchUpdatePassword(newData))
    }
}

export function getUserByIds(idList) {
    return async  dispatch => {
        const trimmedList = [new Set(...idList)]
        let response = (trimmedList.length > 1) ?
            [{ _id: "testID2", name: "userName2", email: "test email2" },
            { _id: "testID3", name: "userName3", email: "test email3" }] :
            (trimmedList.length === 1) ?
                [{ _id: "testUserId", name: "userName", email: "test email" }] :
                ""
        dispatch(dispatchAddOtherUsers(response))

    }
}