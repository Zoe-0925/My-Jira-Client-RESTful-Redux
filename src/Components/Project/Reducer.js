
import {
    LOADING_PROJECT, ERROR_PROJECT, CREATE_SUCCESS_PROJECT, DELETE_SUCCESS_PROJECT,
    UPDATE_SUCCESS_PROJECT, APPEND_SUCCESS_CURRENT_PROJECT, APPEND_SUCCESS_PROJECTS
} from "./Actions"

export default function ProjectReducer(state = {
    loading: false,
    authenticated: false,
    projects: [],
    errorMessage: "",
    currentProject: {
        _id: "test id",
        name: "test name",
        key: "test key",
        category: "test category",
        lead: "test lead",
        image: "test image",
        default_assignee: "test default_assignee"
    }
}, action) {
    let newState;
    switch (action.type) {
        case LOADING_PROJECT:
            return Object.assign({}, state, { loading: true, errorMessage: "" })
        case CREATE_SUCCESS_PROJECT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.projects.push(action.data)
            return newState
        case DELETE_SUCCESS_PROJECT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.projects = newState.projects.filter(item => item._id === action.id)
            return newState
        case APPEND_SUCCESS_PROJECTS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.projects = newState.projects.concat(action.data)
            return newState
        case UPDATE_SUCCESS_PROJECT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            let project = newState.projects = newState.projects.find(item => item._id === action.data._id)
            project = action.data
            return newState
        case ERROR_PROJECT:
            return Object.assign({}, state, { loading: false, authenticated: false, errorMessage: action.data })
        default:
            return state
    }


};

