//Cited from https://github.com/kilkelly/react-passport-redux-example/blob/master/src/client/actions/users.js
import axios from 'axios'
import { post, put, jwtConfig } from "../Util"
import { useDispatch } from "react-redux";
import thunk from "redux-thunk";
//import { history } from "../../history"

export const CREATE_USER = "CREATE_USER"
export const GET_USER_BY_ID = "GET_USER_BY_ID"
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL"
export const CHECK_EMAIL_EXIST = "CHECK_EMAIL_EXIST"
export const UPDATE_USER_INFO = "UPDATE_USER_INFO"
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL"
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD"
export const DELETE_USER = "UPDATE_USER"

/**    --- New --- */
export const MANUAL_LOGIN_USER = "MANUAL_LOGIN_USER"
export const LOGIN_SUCCESS_USER = "LOGIN_SUCCESS_USER"
export const LOGIN_ERROR_USER = "LOGIN_ERROR_USER"
export const SIGNUP_USER = "SIGNUP_USER"
export const SIGNUP_SUCCESS_USER = "SIGNUP_SUCCESS_USER"
export const SIGNUP_ERROR_USER = "SIGNUP_ERROR_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const LOGOUT_SUCCESS_USER = "LOGOUT_SUCCESS_USER"
export const LOGOUT_ERROR_USER = "LOGOUT_ERROR_USER"
export const REGISTER_USER = "REGISTER_USER"
export const REGISTER_SUCCESS_USER = "REGISTER_SUCCESS_USER"
export const REGISTER_ERROR_USER = "REGISTER_ERROR_USER"
/**    --- New --- */

// "Log In" action creators
function beginLogin() {
    return { type: types.MANUAL_LOGIN_USER }
}

function loginSuccess(data) {
    return {
        type: types.LOGIN_SUCCESS_USER,
        data
    }
}

function loginError() {
    return { type: types.LOGIN_ERROR_USER }
}

// "Log Out" action creators
function beginLogout() {
    return { type: types.LOGOUT_USER }
}

function logoutSuccess() {
    return { type: types.LOGOUT_SUCCESS_USER }
}

function logoutError() {
    return { type: types.LOGOUT_ERROR_USER }
}

// "Register" action creators
function beginRegister() {
    return { type: types.REGISTER_USER }
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

function registerSuccess() {
    return { type: types.REGISTER_SUCCESS_USER }
}

function registerError() {
    return { type: types.REGISTER_ERROR_USER }
}



// Example of an Async Action Creator
// http://redux.js.org/docs/advanced/AsyncActions.html
export function manualLogin(
    data,
    successPath // path to redirect to upon successful log in
) {
    return dispatch => {
        dispatch(beginLogin())

        return makeUserRequest("post", data, "/login")
            .then(response => {
                if (response.data.success) {
                    dispatch(loginSuccess(data))

                    //TODO update this to project board page
                    //  history.push("/projects")
                } else {
                    dispatch(loginError())
                    let loginMessage = response.data.message
                    return loginMessage
                }
            })
            .catch(function (response) {
                if (response instanceof Error) {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', response.message);
                }
            })
    }
}

// Example of an Async Action Creator
// http://redux.js.org/docs/advanced/AsyncActions.html
export function manualLogout() {
    return dispatch => {
        dispatch(beginLogout())

        return axios.get("/logout")
            .then(response => {
                if (response.data.success) {
                    dispatch(logoutSuccess())
                    // use browserHistory singleton to control navigation. Will generate a 
                    // state change for time-traveling as we are using the react-router-redux package
                    //  history.push("/Login") // logout to home page
                } else {
                    dispatch(logoutError())
                }
            })
            .catch(response => {
                if (response instanceof Error) {
                    // Something happened during logout that triggered an Error
                    console.log('Error', response.message);
                }
            })
    }
}

//TODO need to update here to connect passport and 3rd party register
export function manualRegister(data) {

    return dispatch => {
        dispatch(beginRegister())

        return makeUserRequest("post", data, "/register")
            .then(response => {
                if (response.data.success) {
                    dispatch(registerSuccess())
                    dispatch(manualLogin(data, "/"))
                } else {
                    dispatch(registerError())
                    let registerMessage = response.data.message
                    return registerMessage
                }
            })
            .catch(response => {
                if (response instanceof Error) {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', response.message);
                }
            })
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
