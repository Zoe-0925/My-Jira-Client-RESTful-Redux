import axios from 'axios'
import { post, put, jwtConfig } from "../Util"
require('dotenv').config()


export const LOADING_ISSUE = "LOADING_ISSUE"
export const ERROR_ISSUE = "ERROR_ISSUE"
export const CREATE_SUCCESS_ISSUE = "CREATE_SUCCESS_ISSUE"
export const DELETE_SUCCESS_ISSUE = "DELETE_SUCCESS_ISSUE"
export const UPDATE_SUCCESS_ISSUE = "UPDATE_SUCCESS_ISSUE"
export const APPEND_SUCCESS_ISSUES = "APPEND_SUCCESS_ISSUES"
export const APPEND_SUCCESS_CURRENT_ISSUE = "APPEND_SUCCESS_CURRENT_ISSUE"
export const APPEND_SUCCESS_ISSUES_PARENT = "APPEND_SUCCESS_ISSUES_PARENT"
export const APPEND_SUCCESS_ISSUES_CHILDREN = "APPEND_SUCCESS_ISSUES_CHILDREN"

/**********************************  Actions  ******************************************/

//TODO analyze!!!
//TODO: optimize the data structure to store issues!
export function appendSuccessfulIssues(data) {
    return {
        type: APPEND_SUCCESS_ISSUES,
        data: data
    }
}

export function appendCurrentIssue(data) { //Append the issue to be opened in a page or modal
    return {
        type: APPEND_SUCCESS_CURRENT_ISSUE,
        data: data
    }
}

export function createSuccessfulIssue(data) {
    return {
        type: CREATE_SUCCESS_ISSUE,
        data: data
    }
}

export function deleteSuccessfulIssue(id) {
    return {
        type: DELETE_SUCCESS_ISSUE,
        id: id
    }
}

export function updateSuccessfulIssues(data) {
    return {
        type: UPDATE_SUCCESS_ISSUE,
        data: data
    }
}
/**********************************  Thunk Actions  ******************************************/

export async function getIssuesForProject(projectId, token) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        try {
            const response = await dispatch(fetchProjectsIssues(process.env.BASE, projectId, token))
            if (response.success) {
                dispatch(appendSuccessfulLabels(response.data))
            }
            else {
                dispatch(dispatchError(response.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

export async function createIssue(data, token) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        try {
            const response = await dispatch(fetchCreateIssue(process.env.BASE, data, token))
            if (response.success) {
                let newData = Object.assign({}, data)
                newData._id = response.id
                dispatch(createSuccessfulIssue(newData))
            }
            else {
                dispatch(dispatchError(response.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

export async function getASingleIssue(id, token) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        try {
            const response = await dispatch(fetchIssueById(process.env.BASE, id, token))
            if (response.success) {
                dispatch(appendSuccessfulIssues(response.data))
            }
            else {
                dispatch(dispatchError(response.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

//TODO need to think about the flow.
//Where to store in the store, and where does the client take it
export async function getIssueByProjectAndType(id, type, token) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        try {
            const response = await dispatch(fetchByProjectAndIssueType(process.env.BASE, id, type, token))
            if (response.success) {
                dispatch(appendCurrentIssue(response.data))
            }
            else {
                dispatch(dispatchError(response.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}


export async function updateIssue(data, token) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        try {
            const response = await dispatch(fetchUpdateIssue(process.env.BASE, data, token))
            if (response.success) {
                dispatch(updateSuccessfulIssue(data))
            }
            else {
                dispatch(dispatchError(response.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}

export async function deleteIssue(id, token) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        try {
            const response = await dispatch(fetchDeleteIssue(process.env.BASE, id, token))
            if (response.success) {
                dispatch(deleteSuccessfulIssues(id))
            }
            else {
                dispatch(dispatchError(response.message))
            }
        }
        catch (err) {
            dispatch(dispatchError(err))
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}
/**********************************  API Call Actions  ******************************************/

function fetchCreateIssue(BASE, item, token) {
    return post('/issues/', BASE, item, token)
}

//TODO create issue type
//Change the enum...
//Maybe issue type itself is anoher document LOL


function fetchIssueById(BASE, id, token) {//fetch all Issues of a user
    return axios.get(BASE + '/issues/' + id, jwtConfig(token));
}

function fetchProjectsIssues(BASE, id, token) {//fetch all Issues in a project
    return axios.get(BASE + '/issues/project/' + id, jwtConfig(token));
}

function fetchByProjectAndIssueType(BASE, id, type, token) {//fetch all Issues of a particular type in a project
    return axios.get(BASE + '/issues/project/' + id + 'issueType/' + type, jwtConfig(token));
}

function fetchByAssigneeAndIssueType(BASE, id, type, token) {//fetch all Issues of a particular type of an assignee
    return axios.get(BASE + '/issues/assignee/' + id + 'issueType/' + type, jwtConfig(token));
}

function fetchByReporteeAndIssueType(BASE, id, type, token) {//fetch all Issues of a particular type of a reportee
    return axios.get(BASE + '/issues/reportee/' + id + 'issueType/' + type, jwtConfig(token));
}

function fetchChildren(BASE, id, token) {//fetch all chilren of an Issues 
    return axios.get(BASE + '/issues/' + id + '/children', jwtConfig(token)); //e.g. subtasks of a task    or   tasks of an epic 
}

function fetchParent(BASE, id, token) {//fetch all chilren of an Issues 
    return axios.get(BASE + '/issues/' + id + '/parent', jwtConfig(token)); //e.g. subtasks of a task    or   tasks of an epic 
}

function fetchUpdateIssue(BASE, id, update, token) {//fetch all Issues of a user
    return put('/issues/' + id, BASE, item, token)
}

function fetchDeleteIssue(BASE, id, token) {//fetch all Issues of a user
    return axios.delete(BASE + '/issues/' + id, jwtConfig(token));
}
