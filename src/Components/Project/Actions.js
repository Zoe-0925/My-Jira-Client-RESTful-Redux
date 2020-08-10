import axios from 'axios'
import { post, put, jwtConfig } from "../Util"

export const LOADING_PROJECT = "LOADING_PROJECT"
export const ERROR_PROJECT = "ERROR_PROJECT"
export const CREATE_SUCCESS_PROJECT = "CREATE_SUCCESS_PROJECT"
export const DELETE_SUCCESS_PROJECT = "DELETE_SUCCESS_PROJECT"
export const UPDATE_SUCCESS_PROJECT = "UPDATE_SUCCESS_PROJECT"
export const APPEND_SUCCESS_PROJECTS = "APPEND_SUCCESS_PROJECTS"



export const CREATE_PROJECT = "CREATE_PROJECT"
export const GET_PROJECT_BY_ID = "GET_PROJECT_BY_ID"
export const GET_USERS_PROJECT = "GET_USERS_PROJECT"
export const UPDATE_PROJECT = "UPDATE_PROJECT"
export const DELETE_PROJECT = "UPDATE_PROJECT"
export const LEAVE_PROJECT = "LEAVE_PROJECT"


/***************** Actions  ***********************/
export function createSuccessfulProject(data) {
    return {
        type: CREATE_SUCCESS_PROJECT,
        data: data
    }
}

export function appendSuccessfulProject(data) {
    return {
        type: APPEND_SUCCESS_PROJECTS,
        data: data //an array
    }
}

export function appendCurrentProject(data) {
    return {
        type: APPEND_SUCCESS_CURRENT_PROJECTS,
        data: data //an array
    }
}

export function updateSuccessfulProject(data) {
    return {
        type: UPDATE_SUCCESS_PROJECT,
        data: data
    }
}

export function dispatchError(data) {
    return {
        type: ERROR_PROJECT,
        data: data
    }
}

/*****************  Thunk Actions  ****************/
export async function createProject(id, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        try {
            const response = await dispatch(fetchCreateProject(process.env.BASE, id, token))
            if (response.data.success) {
                data._id = response.data.id
                dispatch(createSuccessfulProject(data))
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

//Get all projects of the user
export async function getAllProjects(userId, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        try {
            const response = await dispatch(fetchAllProjects(process.env.BASE, userId, token))
            if (response.data.success) {
                dispatch(appendSuccessfulProjects(response.data.data))
            }
            else {
                dispatch(dispatchError(response.data.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            console.log('Error', err);
        }
    }
}

//TODO
//test to see 
export async function getASingleProject(BASE, id, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        try {
            const response = await dispatch(deleteProjectById(process.env.BASE, id, token))
            if (response.data.success) {
                dispatch(appendCurrentProject(response.data.data))
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

export async function updateProject(id, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        try {
            const response = await dispatch(deleteProjectById(process.env.BASE, id, token))
            if (response.data.success) {
                dispatch(updateSuccessfulProject(response.data.data))
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

export async function deleteProject(id, token) {
    return async  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        try {
            const response = await dispatch(fetchProjectById(process.env.BASE, id, token))
            if (response.data.success) {
                dispatch(deleteSuccessfulProject(id))
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
/*****************  API Calls****************/

export function fetchCreateProject(BASE, item, token) {
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