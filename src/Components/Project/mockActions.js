import { v4 as uuidv4 } from 'uuid'

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

const mockProject = {
    _id: "test project id",
    name: "My EC",
    key: "test key",
    category: "test category",
    lead: "mock user id",
    members: ["mock user id"],
    image: "test image",
    issues: ["To be continued...."],
    default_assignee: 'Project Lead',
    start_date: new Date()
}

/*****************  Thunk Actions  ****************/
export async function createProject(id) {
    return async  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        data._id = uuidv4()
        dispatch(createSuccessfulProject(data))
    }
}

//Get all projects of the user
export async function getAllProjects(userId) {
    return async  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        dispatch(appendSuccessfulProjects([mockProject]))

    }
}

//TODO
//test to see 
export async function getASingleProject(id) {
    return async  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        dispatch(appendCurrentProject(mockProject))
    }
}

export async function updateProject(id, update) {
    return async  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        dispatch(updateSuccessfulProject(mockProject))
    }
}

export async function deleteProject(id) {
    return async  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        dispatch(deleteSuccessfulProject(id))
    }
}