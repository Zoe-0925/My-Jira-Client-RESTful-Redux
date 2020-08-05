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

export function signUp(account) {

}

export function login(account) {

}

export function logout(account){
    
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
