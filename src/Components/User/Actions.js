//Cited from https://github.com/kilkelly/react-passport-redux-example/blob/master/src/client/actions/users.js
import axios from 'axios'
import { post, put, jwtConfig } from "../Util"
import history from "../../history"
require('dotenv').config()
//import { history } from "../../history"
export const ERROR_USER = "ERROR_USER"
export const LOADING_USER = "LOADING_USER"

export const CREATE_USER = "CREATE_USER"

//TODO
export const GET_USER_BY_ID = "GET_USER_BY_ID"
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL"
export const CHECK_EMAIL_EXIST = "CHECK_EMAIL_EXIST"
export const UPDATE_USER_INFO = "UPDATE_USER_INFO"
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL"
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD"
export const DELETE_USER = "UPDATE_USER"
//-------------------------------------------------------


/**    --- New --- */
export const LOGIN_SUCCESS_USER = "LOGIN_SUCCESS_USER"
export const SIGNUP_USER = "SIGNUP_USER"
export const SIGNUP_SUCCESS_USER = "SIGNUP_SUCCESS_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const LOGOUT_SUCCESS_USER = "LOGOUT_SUCCESS_USER"
/**    --- New --- */

// "Log In" action creators
function beginLogin() {
    return { type: MANUAL_LOGIN_USER }
}

function loginSuccess(data) {
    return {
        type: types.LOGIN_SUCCESS_USER,
        data
    }
}

function loginError() {
    return { type: ERROR_USER }
}

// "Log Out" action creators
function beginLogout() {
    return { type: LOGOUT_USER }
}

function logoutSuccess() {
    return { type: LOGOUT_SUCCESS_USER }
}

function logoutError() {
    return { type: ERROR_USER }
}

// "Register" action creators
function beginSignup() {
    return { type: SIGNUP_USER }
}

const validateEmail = (email) => {
    return async (dispatch, getState, BASE) => {
        const response = await fetchCheckEmail(BASE, email)
        console.log("response", response)

        //save the validity to the store
        //The view will use useEffect to select and call the other actions 
        //dispatch({ type: "SET_JOKE", joke });
    }
}

function signupSuccess() {
    return { type: SIGNUP_SUCCESS_USER }
}

function signupError() {
    return { type: ERROR_USER }
}



// Example of an Async Action Creator
// http://redux.js.org/docs/advanced/AsyncActions.html
export function manualLogin(
    data,
    successPath, // path to redirect to upon successful log in
    token
) {
    return dispatch => {
        dispatch(beginLogin())
        try {
            const response = await fetchLogin(process.env.BASE, data, token)
            const json = await response.json()
            if (json.data.success) {
                dispatch(loginSuccess(data))
                history.push(successPath)
            }
            else {
                dispatch(loginError())
                let loginMessage = json.data.message
                return loginMessage
            }
        }
        catch (err) {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

export async function manualLogout(data, token) {
    return dispatch => {
        dispatch(beginLogout())
        try {
            const response = await fetchLogout(process.env.BASE, data, token)
            const json = await response.json()
            if (json.data.success) {
                dispatch(logoutSuccess())
                history.push("./login")
            }
            else {
                dispatch(logoutError())
                let message = json.data.message
                return message
            }
        }
        catch (err) {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

//TODO need to update here to connect passport and 3rd party register
export async function manualSignup(data) {
    return dispatch => {
        dispatch(beginSignup())
        try {
            const response = await fetchSignUp(process.env.BASE, data, token)
            const json = await response.json()
            if (json.data.success) {
                data._id = json.data.id
                dispatch(signupSuccess(data))
                dispatch(manualLogin(data, "/projects"))
            }
            else {
                dispatch(signupError())
                let message = json.data.message
                return message
            }
        }
        catch (err) {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

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
    return post('/users/checkEmail', BASE, item, "")
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

export function updateUserInfo(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/info/' + id, BASE, update, token)
}

export function updateEmail(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/email/' + id, BASE, update, token)
}

export function updatePassword(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/password' + id, BASE, update, token)
}

export function deleteUser(BASE, id, token) {//fetch all USERs of a user
    return axios.delete(BASE + '/users/' + id, jwtConfig(token));
}
