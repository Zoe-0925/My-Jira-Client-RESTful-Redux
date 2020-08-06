import axios from 'axios'

const BASE = 'http://localhost:8080/api/'

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
export const  SIGNUP_ERROR_USER = "SIGNUP_ERROR_USER"
export const  LOGOUT_USER = "LOGOUT_USER"
export const  LOGOUT_SUCCESS_USER = "LOGOUT_SUCCESS_USER"
export const  LOGOUT_ERROR_USER = "LOGOUT_ERROR_USER"
export const  REGISTER_USER = "REGISTER_USER"
export const  REGISTER_SUCCESS_USER = "REGISTER_SUCCESS_USER"
export const  REGISTER_ERROR_USER = "REGISTER_ERROR_USER"
/**    --- New --- */

export function signUp(account) {

}

export function login(account) {

}

export function logout(account) {

}

export function createUser(item) {
    return axios({
        method: 'post',
        url: BASE + '/users/',
        data: item
    });
}

export function fetchUserById(id) {//fetch all USERs of a user
    return axios.get(BASE + '/users/' + id);
}

export function fetchUserByEmail(email) {//fetch all USERs of a user
    return axios.get(BASE + '/users/email' + email);
}

// @return: {result:boolean}
export function fetchCheckEmail(email) {//fetch all USERs of a user
    return axios.get(BASE + '/users/checkEmail' + email);
}

export function updateUserInfo(id, update) {//fetch all USERs of a user
    return axios.put(BASE + '/users/info' + id, update);
}

export function updateEmail(id, update) {//fetch all USERs of a user
    return axios.put(BASE + '/users/email' + id, update);
}

export function updatePassword(id, update) {//fetch all USERs of a user
    return axios.put(BASE + '/users/password' + id, update);
}

export function deleteUser(id) {//fetch all USERs of a user
    return axios.delete(BASE + '/users/' + id);
}
