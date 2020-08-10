import {
    CREATE_SUCCESS_LABEL,
    DELETE_SUCCESS_LABEL,
    APPEND_SUCCESS_LABELS,
    LOADING_LABEL,
    ERROR_LABEL
} from "./Actions"

export default function LabelReducer(state = {
    loading: false,
    authenticated: false,
    errorMessage: "",
    labels: []
}, action) {
    let newState
    switch (action.type) {
        case LOADING_LABEL:
            return Object.assign({}, state, { loading: true, errorMessage: "" })
        case CREATE_SUCCESS_LABEL:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.labels = newState.labels.push(action.data)
            return newState
        case DELETE_SUCCESS_LABEL:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.labels = newState.labels.filter(item => item._id === action.id)
            return newState
        case APPEND_SUCCESS_LABELS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.labels = newState.labels.concat(action.data)
            return newState
        case ERROR_LABEL:
            return Object.assign({}, state, { loading: false, authenticated: false, errorMessage: action.data })
        default:
            return state;
    }


};

