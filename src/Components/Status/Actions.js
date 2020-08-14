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
export const REORDER_ISSUES = "REORDER_ISSUES"
export const MOVE_ISSUES = "MOVE_ISSUES"
export const UNDO_REORDER_ISSUE = "UNDO_REORDER_ISSUE"
export const UNDO_MOVE_ISSUE = "UNDO_MOVE_ISSUE"

export const createSuccessfulStatus = (data) => {
    return {
        type: CREATE_SUCCESS_STATUS,
        data: data
    }
}

export const updateSuccessfulStatus = (data) => {
    return {
        type: UPDATE_SUCCESS_STATUS,
        data: data
    }
}

export const deleteSuccessfulStatus = (id, issues) => {
    return {
        type: DELETE_SUCCESS_STATUS,
        id: id,
        issues: issues
    }
}

export function dispatchError(data) {
    return {
        type: ERROR_STATUS,
        data: data
    }
}

export const appendSuccessfulStatus = (data) => {
    return {
        type: APPEND_SUCCESS_STATUS,
        data: data
    }
}

export const reorderIssues = (index, startIndex, endIndex) => {
    console.log("index", index)
    return {
        type: REORDER_ISSUES,
        index: index,
        startIndex: startIndex,
        endIndex: endIndex
    }
}

export const moveIssues = (source, destination, startIndex, endIndex) => {
    return {
        type: MOVE_ISSUES,
        sourceIndex: source,
        destinationIndex: destination,
        startIndex: startIndex,
        endIndex: endIndex
    }
}


/**************************** Thunk Actions ***************************/
//TODO not finished yet.

export function updateIssueOrderRequest(id, startIndex, endIndex) {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS })
        try {
            const token = localStorage.getItem("token")
            const response = await dispatch(fetchUpdateIssueOrders(process.env.BASE, id, startIndex, endIndex, token))
            if (!response.success) {
                dispatch({ type: UNDO_REORDER_ISSUE })
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            //TODO
            //dispatch undo
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

//TODO not finished yet.
export function moveIssuesRequest(source, destination, startIndex, endIndex) {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS })
        try {
            const token = localStorage.getItem("token")
            const response = await dispatch(fetchUpdateMultipleIssueOrders(process.env.BASE, source, destination, startIndex, endIndex, token))
            if (!response.success) {
                dispatch({ type: UNDO_MOVE_ISSUE })
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            //TODO
            //dispatch undo
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}


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

export async function fetchStatusById(BASE, id, token) {
    return axios.get(BASE + 'status/' + id, jwtConfig(token));
}

export async function fetchAllStatus(BASE, id, token) {
    return axios.get(BASE + 'status/project/' + id, jwtConfig(token));
}

//TODO not sure if it's useful. Maybe delete later
export async function fetchUpdateStatus(BASE, id, update, token) {
    return put("status/" + id, BASE, update, token)
}

export async function fetchUpdateIssueOrders(BASE, id, startIndex, endIndex, token) {
    return put("status/" + id + "/issueOrders", BASE,
        { startIndex: startIndex, endIndex: endIndex }, token)
}

export async function fetchUpdateMultipleIssueOrders(BASE, sourceId, destinationId, startIndex, endIndex, token) {
    return put("status/issueOrders", BASE,
        { source: sourceId, destination: destinationId, startIndex: startIndex, endIndex: endIndex }, token)
}

export async function deleteStatusById(BASE, id, token) {
    return axios.delete(BASE + 'status/' + id, jwtConfig(token));
}

