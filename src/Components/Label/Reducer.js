import {
    CREATE_SUCCESS_LABEL,
    DELETE_SUCCESS_LABEL,
    APPEND_SUCCESS_LABELS,
    LOADING_LABEL,
    ERROR_LABEL
} from "./Actions"

//TODO intial state should be from the local storage???
const initialState = {
    loading: false,
    authenticated: false,
    labels: []
}

export default function LabelReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOADING_LABEL:
            return Object.assign({}, state, { loading: true })
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
            return Object.assign({}, state, { loading: false, authenticated: false })
        default:
            return state;
    }


};

