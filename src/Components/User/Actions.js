import axios from 'axios'
import { post, put, jwtConfig } from "../Util"
import history from "../../history"
import { setLocalStorage } from "../../ViewComponents/Credential/Auth.service"
require('dotenv').config()


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

//TODO fix the signup flow
function signupSuccess(data) {
    return {
        type: SIGNUP_SUCCESS_USER,
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

/******************* Thunk Actions  *****************************/
export async function manualLogin(
    data,
    successPath, // path to redirect to upon successful log in
    token
) {
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        try {
            const response = await fetchLogin(process.env.BASE, data, token)
            if (response.data.success) {
                setLocalStorage(tokenResponse.data.token)
                dispatch(loginSuccess(response.data.data))
                history.push(successPath)
            }
            else {
                dispatch(dispatchError(response.data.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

export async function manualLogout(data, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        try {
            const response = await fetchLogout(process.env.BASE, data, token)
            if (response.data.success) {
                dispatch({ type: LOGOUT_SUCCESS_USER })
                localStorage.removeItem("token");
                localStorage.removeItem("expires_at");
                history.push("./login")
            }
            else {
                dispatch(dispatchError(response.data.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

//TODO need to update here to connect passport and 3rd party register
export async function manualSignup(data, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        try {
            const response = await fetchSignUp(process.env.BASE, data, token)
            if (response.data.success) {
                data._id = response.data.data.id
                dispatch({ type: SIGNUP_SUCCESS_USER })
                dispatch(manualLogin(data, "/projects"))
            }
            else {
                dispatch(dispatchError(response.data.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

export async function updateInfo(data, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        try {
            const response = await fetchUpdateUserInfo(process.env.BASE, { name: data.name }, token)
            if (response.data.success) {
                dispatch(updateInfo(data))
            }
            else {
                dispatch(dispatchError(response.data.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

export async function updateEmail(data, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        try {
            const response = await fetchUpdateUserEmail(process.env.BASE, { email: data.email }, token)
            if (response.data.success) {
                dispatch(update(response.data.data))
            }
            else {
                dispatch(dispatchError(response.data.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

export async function updatePassword(data, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_USER })
        try {
            const response = await fetchUpdateUserPassword(process.env.BASE,
                { salt: data.salt, hash: data.hash }, token)
            if (response.data.success) {
                dispatch(update(data))
            }
            else {
                dispatch(dispatchError(response.data.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

/********************* API calls *************************/

export function fetchSignUp(BASE, item, token) {
    return post('/users/signup', BASE, item, token)
}

export function fetchLogin(BASE, item, token) {
    return post('/users/login', BASE, item, token)
}

export function fetchLogout(BASE, item, token) {
    return post('/users/logout', BASE, item, "")
}

//TODO for testing purpose
export function createUser(BASE, item) {
    return post('/users/', BASE, item, "")
}

export function fetchUserById(BASE, id, token) {//fetch all USERs of a user
    return axios.get(BASE + '/users/' + id, jwtConfig(token));
}

export function fetchUserByEmail(BASE, email, token) {//fetch all USERs of a user
    return axios.get(BASE + '/users/email' + email, jwtConfig(token));
}

// @return: {result:boolean}
export function fetchCheckEmail(BASE, email, token) {//fetch all USERs of a user
    return post('/users/checkEmail', BASE, email, token)
}

export function fetchUpdateUserInfo(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/info/' + id, BASE, update, token)
}

export function fetchUpdateEmail(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/email/' + id, BASE, update, token)
}

export function fetchUpdatePassword(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/password' + id, BASE, update, token)
}

export function deleteUser(BASE, id, token) {//fetch all USERs of a user
    return axios.delete(BASE + '/users/' + id, jwtConfig(token));
}
