import axios from 'axios'
import { post, put, jwtConfig } from "../Util"
require('dotenv').config()


export const LOADING_STATUS = "LOADING_STATUS"
export const ERROR_STATUS = "ERROR_STATUS"
export const CREATE_SUCCESS_STATUS = "CREATE_SUCCESS_STATUS"
export const DELETE_SUCCESS_STATUS = "DELETE_SUCCESS_STATUS"
export const UPDATE_SUCCESS_STATUS = "UPDATE_SUCCESS_STATUS"
export const APPEND_SUCCESS_STATUS = "APPEND_SUCCESS_STATUS"

export const CREATE_STATUS = "CREATE_STATUS"
export const GET_STATUS_BY_ID = "GET_STATUS_BY_ID"
export const GET_ALL_STATUS = "GET_ALL_STATUS"
export const UPDATE_STATUS = "UPDATE_STATUS"
export const DELETE_STATUS = "UPDATE_STATUS"

export const createSuccessfulStatus = (data) => {
    return {
        type: CREATE_SUCCESS_STATUS,
        data: data
    }
}

export const updateSuccessfulStatus = () => {
    return {
        type: UPDATE_SUCCESS_STATUS,
        data: data
    }
}

export const deleteSuccessfulStatus = () => {
    return {
        type: ERROR_LABEL,
        data: data
    }
}

export function dispatchError(id) {
    return {
        type: DELETE_SUCCESS_STATUS,
        id: id
    }
}

export const appendSuccessfulStatus = (data) => {
    return {
        type: APPEND_SUCCESS_STATUS,
        data: data
    }
}


/**************************** Thunk Actions ***************************/
export function createStatus(data) {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS })
        try {
            const token = localStorage.getItem("token")
            const response = await dispatch(fetchCreateStatus(process.env.BASE, data, token))
            if (response.data.success) {
                data._id = response.data.data.id
                dispatch(createSuccessfulStatus(data))
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

export function updateStatus(data) {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS })
        try {
            const token = localStorage.getItem("token")
            const response = await dispatch(fetchUpdateStatus(process.env.BASE, data, token))
            if (response.data.success) {
                data._id = response.data.data.id
                dispatch(updateSuccessfulStatus(data))
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

export function deleteStatus(id) {
    return async  dispatch => {
        dispatch({ type: LOADING_STATUS })
        try {
            const token = localStorage.getItem("token")
            const response = await dispatch(deleteStatusById(process.env.BASE, id, token))
            if (response.data.success) {
                dispatch(deleteSuccessfulStatus(id))
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

export function getAllStatus(projectId) {
    return async  dispatch => {
        dispatch({ type: LOADING_STATUS })
        try {
            const token = localStorage.getItem("token")
            const response = await dispatch(fetchAllStatus(process.env.BASE, projectId, token))
            if (response.data.success) {
                dispatch(appendSuccessfulStatus(response.data.data))
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

/************************ API call Actions ****************************/
export async function fetchCreateStatus(BASE, item, token) {
    return post('status/', BASE, item, token)
}

export async function fetchStatusById(BASE, id, token) {//fetch all projects of a Status
    return axios.get(BASE + 'status/' + id, jwtConfig(token));
}

export async function fetchAllStatus(BASE, id, token) {//fetch all status in a project
    return axios.get(BASE + 'status/project/' + id, jwtConfig(token));
}

//TODO not sure if it's useful. Maybe delete later
export async function fetchUpdateStatus(BASE, id, update, token) {//fetch all projects of a Status
    return put('status/' + id, BASE, update, token)
}

export async function deleteStatusById(BASE, id, token) {//fetch all projects of a Status
    return axios.delete(BASE + 'status/' + id, jwtConfig(token));
}

