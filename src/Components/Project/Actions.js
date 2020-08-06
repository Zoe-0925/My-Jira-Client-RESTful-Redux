import axios from 'axios'

const BASE = 'http://localhost:8080/api/'

export const CREATE_PROJECT = "CREATE_PROJECT"
export const GET_PROJECT_BY_ID = "GET_PROJECT_BY_ID"
export const GET_USERS_PROJECT = "GET_USERS_PROJECT"
export const UPDATE_PROJECT = "UPDATE_PROJECT"
export const DELETE_PROJECT = "UPDATE_PROJECT"
export const LEAVE_PROJECT = "LEAVE_PROJECT"


export function createProject(item) {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/api/projects/',
        data: item
    });
}

export function fetchUsersProjects(id) {//fetch all projects of a user
    return axios.get(BASE + '/projects/user/' + id);
}

export function fetchProjectById(id) {//fetch all projects of a user
    return axios.get(BASE + '/projects/' + id);
}

export function updateProjectById(id, update) {//fetch all projects of a user
    return axios.put(BASE + '/projects/' + id, update);
}

export function deleteProjectById(id) {//fetch all projects of a user
    return axios.delete(BASE + '/projects/' + id);
}

export function leaveProjectById(id, userId) {//fetch all projects of a user
    return axios.delete(BASE + '/projects/' + id + '/members/' + userId);
}