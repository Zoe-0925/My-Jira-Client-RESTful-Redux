import {
    CREATE_LABEL,
    CREATE_SUCCESS_LABEL,
    DELETE_LABEL,
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
            return Object.assign({}, state, { loading: false, authenticated: true, labels: action.data.label })
        case DELETE_SUCCESS_LABEL:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.labels.filter(item => item.id === action.id)
            return newState
        case APPEND_SUCCESS_LABELS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.labels = [...newState.labels, action.data]
            return newState
        case ERROR_LABEL:
            return Object.assign({}, state, { loading: false, authenticated: false })
        default:
            return state;
    }


};

