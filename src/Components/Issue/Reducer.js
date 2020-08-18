import {
    LOADING_ISSUE, CREATE_SUCCESS_ISSUE, CREATE_SUCCESS_EPIC, DELETE_SUCCESS_ISSUE,
    UPDATE_SUCCESS_ISSUE, DELETE_SUCCESS_EPIC, UPDATE_SUCCESS_EPIC,
    APPEND_SUCCESS_CURRENT_ISSUE, APPEND_SUCCESS_ISSUES_PARENT, APPEND_SUCCESS_ISSUES_CHILDREN,
    ERROR_ISSUE, UPDATE_ISSUE_GROUP, TOGGLE_FLAG
} from "./Actions"
import { DELETE_SUCCESS_STATUS } from "../Status/Actions"

const issues = new Map()
issues.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    issueType: "task", flag: false, reportee: "testUserId", project:"test id"
})

export default function IssueReducer(state = {
    loading: false,
    issues: issues, //Map()
    epics: [],
    authenticated: false,
}, action) {
    let newState;
    switch (action.type) {
        case LOADING_ISSUE:
            return { ...state, loading: true }
        case CREATE_SUCCESS_ISSUE:
            newState = { ...state, authenticated: true, loading: false }
            newState.issues.set(action.data._id, action.data)
            return newState
        case CREATE_SUCCESS_EPIC:
            newState = { ...state, authenticated: true, loading: false }
            newState.epics.push(action.data)
            return newState
        case DELETE_SUCCESS_ISSUE:
            newState = { ...state, authenticated: true, loading: false }
            newState.issues.delete(action.id)
            return newState
        case DELETE_SUCCESS_EPIC:
            newState = { ...state, authenticated: true, loading: false }
            newState.epics.filter(item => item._id = action.id)
            return newState
        case UPDATE_SUCCESS_ISSUE:
            newState = { ...state, authenticated: true, loading: false }
            newState.issues.set(action.data._id, action.data)
            return newState
        case DELETE_SUCCESS_STATUS:
            //accpets a list of issueIds (issues) and a new status id (id)
            newState = { ...state, authenticated: true, loading: false }

            //TODO fix
            action.issues.map(each => {
                let issue = newState.issues.get(each)
                issue.status = action.id
                newState.issues.set(each, issue)
            })
            return newState
        case UPDATE_SUCCESS_EPIC:
            newState = { ...state, authenticated: true, loading: false }
            let epic = newState.epics.find(item => item._id = action.data._id)
            epic = action.data
            return newState
        case UPDATE_ISSUE_GROUP:
            newState = { ...state }
            const change = newState.issues.get(action.id)
            newState.splice(newState.indexOf(change), 1, action.data);
            return newState
        case APPEND_SUCCESS_CURRENT_ISSUE:
            return state;
        case APPEND_SUCCESS_ISSUES_PARENT:
            return state;
        case APPEND_SUCCESS_ISSUES_CHILDREN:
            return state;
        case TOGGLE_FLAG:
            newState = { ...state, authenticated: true, loading: false }
            let issue = newState.issues.get(action.id)
            console.log("action.id", action.id, "issue", issue)
            issue.flag = !issue.flag
        case ERROR_ISSUE:
            return { ...state, authenticated: false, loading: false }
        default:
            return state;
    }
};

