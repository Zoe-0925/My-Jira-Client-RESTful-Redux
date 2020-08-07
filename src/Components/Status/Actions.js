import axios from 'axios'
import { post, put, jwtConfig } from "../Util"


export const CREATE_STATUS = "CREATE_STATUS"
export const GET_STATUS_BY_ID = "GET_STATUS_BY_ID"
export const GET_ALL_STATUS = "GET_ALL_STATUS"
export const UPDATE_STATUS = "UPDATE_STATUS"
export const DELETE_STATUS = "UPDATE_STATUS"

export function createStatus(BASE, item, token) {
    return post('status/', BASE, item, token)
}

export function fetchStatusById(BASE, id, token) {//fetch all projects of a Status
    return axios.get(BASE + 'status/' + id, jwtConfig(token));
}

export function fetchAllStatus(BASE, id, token) {//fetch all status in a project
    return axios.get(BASE + 'status/project/' + id, jwtConfig(token));
}

//TODO not sure if it's useful. Maybe delete later
export function updateStatus(BASE, id, update, token) {//fetch all projects of a Status
    return put('status/' + id, BASE, update, token)
}

export function deleteStatusById(BASE, id, token) {//fetch all projects of a Status
    return axios.delete(BASE + 'status/' + id, jwtConfig(token));
}

