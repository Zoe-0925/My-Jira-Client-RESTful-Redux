import {
    LOADING_STATUS, ERROR_STATUS, CREATE_SUCCESS_STATUS, DELETE_SUCCESS_STATUS,
    UPDATE_SUCCESS_STATUS, APPEND_SUCCESS_STATUS
} from "./Actions"

const status = new Map()

export default function StatusReducer(state = {
    loading: false,
    authenticated: false,
    statusOrder: [],
    status: new Map()
}, action) {
    let newState;

    switch (action.type) {
        case LOADING_STATUS:
            return Object.assign({}, state, { loading: true })
        case CREATE_SUCCESS_STATUS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.status = newState.status.push(action.data)
            return newState
        case DELETE_SUCCESS_STATUS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.status = newState.status.filter(item => item._id === action.id)
            return newState
        case UPDATE_SUCCESS_STATUS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.status = newState.status.filter(item => item._id === action.id)
            newState.status = newState.status.push(action.data)
            return newState
        case APPEND_SUCCESS_STATUS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.status = newState.status.push(action.data)
            return newState
        case ERROR_STATUS:
            return Object.assign({}, state, { loading: false, authenticated: false })
        default:
            return state;
    }


};

