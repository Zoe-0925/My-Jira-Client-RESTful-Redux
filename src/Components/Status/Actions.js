import axios from 'axios'

const BASE = 'http://localhost:8080/api/'


export const CREATE_STATUS = "CREATE_STATUS"
export const GET_STATUS_BY_ID = "GET_STATUS_BY_ID"
export const GET_ALL_STATUS = "GET_ALL_STATUS"
export const UPDATE_STATUS = "UPDATE_STATUS"
export const DELETE_STATUS = "UPDATE_STATUS"

export function createStatus(item) {
    return axios({
        method: 'post',
        url: BASE + 'status/',
        data: item
    });
}

export function fetchStatusById(id) {//fetch all projects of a Status
    return axios.get(BASE + 'status/' + id);
}

export function fetchAllStatus(id) {//fetch all status in a project
    return axios.get(BASE + 'status/project/' + id);
}

//TODO not sure if it's useful. Maybe delete later
export function updateStatus(id, update) {//fetch all projects of a Status
    return axios.put(BASE + 'status/' + id, update);
}

export function deleteStatusById(id) {//fetch all projects of a Status
    return axios.delete(BASE + 'status/' + id);
}

