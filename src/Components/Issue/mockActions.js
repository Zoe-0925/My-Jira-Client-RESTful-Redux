import { v4 as uuidv4 } from 'uuid'


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

export function updateSuccessfulIssue(data) {
    return {
        type: UPDATE_SUCCESS_ISSUE,
        data: data
    }
}
/**********************************  Thunk Actions  ******************************************/

export async function getIssuesForProject(projectId) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        const data = [
            {
                "TODO": [{ id: "2", summary: "test 1", key: "test key 1", labels: ["test"] }]
            }
        ]
        dispatch(appendSuccessfulLabels(data))
    }
}

export async function createIssue(data) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        let newData = Object.assign({}, data)
        newData._id = uuidv4()
        dispatch(createSuccessfulIssue(newData))
    }
}

export async function getASingleIssue(id) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        const data = { id: "2", summary: "test 1", key: "test key 1", labels: ["test"] }
        dispatch(appendSuccessfulIssues(data))
    }
}


//TODO need to think about the flow.
//Where to store in the store, and where does the client take it
export async function getIssueByProjectAndType(id, type) {
    return async dispatch => {
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


export async function updateIssue(data) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        dispatch(updateSuccessfulIssue(data))
    }
}

export async function deleteIssue(id) {
    return async dispatch => {
        dispatch({ type: LOADING_ISSUE })
        dispatch(deleteSuccessfulIssues(id))
    }
}
