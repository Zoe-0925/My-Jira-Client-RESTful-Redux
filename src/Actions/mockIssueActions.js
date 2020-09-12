import { v4 as uuidv4 } from 'uuid'

export const LOADING_ISSUE = "LOADING_ISSUE"
export const ERROR_ISSUE = "ERROR_ISSUE"
export const CREATE_SUCCESS_ISSUE = "CREATE_SUCCESS_ISSUE"
export const CREATE_SUCCESS_EPIC = "CREATE_SUCCESS_EPIC"
export const DELETE_SUCCESS_ISSUE = "DELETE_SUCCESS_ISSUE"
export const DELETE_SUCCESS_EPIC = "DELETE_SUCCESS_EPIC"
export const UPDATE_SUCCESS_ISSUE = "UPDATE_SUCCESS_ISSUE"
export const UPDATE_SUCCESS_EPIC = "UPDATE_SUCCESS_EPIC"
export const APPEND_SUCCESS_ISSUES = "APPEND_SUCCESS_ISSUES"
export const APPEND_SUCCESS_EPICS = "APPEND_SUCCESS_EPICS"
export const APPEND_SUCCESS_CURRENT_ISSUE = "APPEND_SUCCESS_CURRENT_ISSUE"
export const APPEND_SUCCESS_CURRENT_EPICS = "APPEND_SUCCESS_CURRENT_EPICS"
export const APPEND_SUCCESS_ISSUES_PARENT = "APPEND_SUCCESS_ISSUES_PARENT"
export const APPEND_SUCCESS_ISSUES_CHILDREN = "APPEND_SUCCESS_ISSUES_CHILDREN"
export const UPDATE_ISSUE_GROUP = "UPDATE_ISSUE_GROUP"
export const TOGGLE_FLAG = "TOGGLE_FLAG"

/**********************************  Actions  ******************************************/

export function appendSuccessfulIssues(data) {
    return {
        type: APPEND_SUCCESS_ISSUES,
        data: data
    }
}

export function appendSuccessfulEpics(data) {
    return {
        type: APPEND_SUCCESS_EPICS,
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

export function createSuccessfulEpic(data) {
    return {
        type: CREATE_SUCCESS_EPIC,
        data: data
    }
}

export function deleteSuccessfulIssue(id) {
    return {
        type: DELETE_SUCCESS_ISSUE,
        id: id
    }
}

export function deleteSuccessfulEpic(id) {
    return {
        type: DELETE_SUCCESS_EPIC,
        id: id
    }
}

export function updateSuccessfulIssue(data) {
    return {
        type: UPDATE_SUCCESS_ISSUE,
        data: data
    }
}

export function updateSuccessfulEpics(data) {
    return {
        type: UPDATE_SUCCESS_EPIC,
        data: data
    }
}

export function updateIssueGroup(id, data) {
    return {
        type: UPDATE_ISSUE_GROUP,
        id: id,
        data: data
    }
}

export function toggleSuccessfulFlag(id) {
    return {
        type: TOGGLE_FLAG,
        id: id
    }
}

/**********************************  Thunk Actions  ******************************************/

export async function getIssuesForProject(projectId, token) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        const data = [
            {
                "TODO": [{ id: "2", summary: "test 1", key: "test key 1", labels: ["test"] }]
            }
        ]
        dispatch(appendSuccessfulIssues(data))
    }
}

export function createIssue(data) {
    return dispatch => {
        dispatch({ type: LOADING_ISSUE })
        let newData = Object.assign({}, data)
        newData._id = uuidv4()
        dispatch(createSuccessfulIssue(newData))
    }
}

export function getASingleIssue(id) {
    return dispatch => {
        dispatch({ type: LOADING_ISSUE })
        const data = { id: "2", summary: "test 1", key: "test key 1", labels: ["test"] }
        dispatch(appendSuccessfulIssues(data))
    }
}


//TODO need to think about the flow.
//Where to store in the store, and where does the client take it
export function getIssueByProjectAndType(id, type) {
    return dispatch => {
        dispatch({ type: LOADING_ISSUE })
        const issue = [{ id: "2", summary: "test issue", key: "test key 1", labels: ["test"] }]
        const epic = [{
            id: "2", summary: "test epic", key: "test key 1", labels: ["test"]
        }]
        const subIssue = [{
            id: "2", summary: "test sub issue", key: "test key 1", labels: ["test"]
        }]
        const data = type === "issue" ? issue : type === "epic" ? epic : type === "subIssue" ? subIssue : ""
        dispatch(appendCurrentIssue(data))
    }
}


export function updateIssue(data) {
    return dispatch => {
        dispatch({ type: LOADING_ISSUE })
        dispatch(updateSuccessfulIssue(data))
    }
}

export function deleteIssue(id, token) {
    return dispatch => {
        dispatch({ type: LOADING_ISSUE })
        dispatch(deleteSuccessfulIssue(id))
    }
}

export function toggleFlag(id) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        dispatch(toggleSuccessfulFlag(id))
    }
}