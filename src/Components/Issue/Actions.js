import axios from 'axios'
import { post, put, jwtConfig } from "../Util"

export const LOADING_ISSUE = "LOADING_ISSUE"
export const ERROR_ISSUE = "ERROR_ISSUE"
export const CREATE_SUCCESS_ISSUE = "CREATE_SUCCESS_ISSUE"
export const DELETE_SUCCESS_ISSUE = "DELETE_SUCCESS_ISSUE"
export const UPDATE_SUCCESS_ISSUE = "UPDATE_SUCCESS_ISSUE"
export const APPEND_SUCCESS_ISSUES = "APPEND_SUCCESS_ISSUES"
export const APPEND_SUCCESS_ISSUES_PARENT = "APPEND_SUCCESS_ISSUES_PARENT"
export const APPEND_SUCCESS_ISSUES_CHILDREN = "APPEND_SUCCESS_ISSUES_CHILDREN"


function createIssue(BASE, item, token) {
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

function updateIssueById(BASE, id, update, token) {//fetch all Issues of a user
    return put('/issues/' + id, BASE, item, token)
}

function deleteIssueById(BASE, id, token) {//fetch all Issues of a user
    return axios.delete(BASE + '/issues/' + id, jwtConfig(token));
}
