import axios from 'axios'
import { post, put, jwtConfig } from "../Util"

const BASE = 'http://localhost:8080/api/'

export const CREATE_PROJECT = "CREATE_PROJECT"
export const GET_PROJECT_BY_ID = "GET_PROJECT_BY_ID"
export const GET_USERS_PROJECT = "GET_USERS_PROJECT"
export const UPDATE_PROJECT = "UPDATE_PROJECT"
export const DELETE_PROJECT = "UPDATE_PROJECT"
export const LEAVE_PROJECT = "LEAVE_PROJECT"


export function createProject(BASE, item, token) {
    return post('/projects/', BASE, item, token)
}

export function fetchUsersProjects(BASE, id, token) {//fetch all projects of a user
    return axios.get(BASE + '/projects/user/' + id, jwtConfig(token));
}

export function fetchProjectById(BASE, id, token) {//fetch all projects of a user
    return axios.get(BASE + '/projects/' + id, jwtConfig(token));
}

export function updateProjectById(BASE, id, update, token) {//fetch all projects of a user
    return put('/projects/' + id, BASE, update, token)
}

export function deleteProjectById(BASE, id, token) {//fetch all projects of a user
    return axios.delete(BASE + '/projects/' + id, jwtConfig(token));
}

export function leaveProjectById(BASE, id, userId, token) {//fetch all projects of a user
    return axios.delete(BASE + '/projects/' + id + '/members/' + userId, jwtConfig(token));
}