import {
    LOADING_STATUS, ERROR_STATUS, CREATE_SUCCESS_STATUS, DELETE_SUCCESS_STATUS,
    UPDATE_SUCCESS_STATUS, APPEND_SUCCESS_STATUS, REORDER_ISSUES, MOVE_ISSUES,
    UNDO_REORDER_ISSUE, UNDO_MOVE_ISSUE
} from "./Actions"

const status = new Map()
status.set("1", { _id: "1", name: "TO DO", issues: ["2"] })
status.set("2", { _id: "2", name: "IN PROGRESS", issues: [] })
status.set("3", { _id: "3", name: "DONE", issues: [] })
status.set("4", { _id: "4", name: "TEST", issues: [] })


export default function StatusReducer(state = {
    loading: false,
    authenticated: false,
    statusOrder: ["1", "2", "3", "4"],
    status: status,
    pastStatus: status,
    pastStatusOrder: ["1", "2", "3", "4"]
}, action) {
    let newState;
    let status


    switch (action.type) {
        case LOADING_STATUS:
            return Object.assign({}, state, { loading: true })
        case REORDER_ISSUES: //Move the item at the start index to the end index
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            //Update the history
            newState.pastStatus = newState.status
            //Update the issue order
            const statusId = newState.statusOrder[action.index]
            status = newState.status.get(statusId)
            let issues = status.issues
            const [removedToReorder] = issues.splice(action.startIndex, 1);
            issues.splice(action.endIndex, 0, removedToReorder);
            return newState
        case MOVE_ISSUES:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.pastStatus = newState.status
            newState.pastStatusOrder = newState.statusOrder
            const sourceStatusId = newState.statusOrder[action.sourceIndex]
            const destinationStatusId = newState.statusOrder[action.destinationIndex]
            let sourceIssues = newState.status.get(sourceStatusId).issues
            let destinationIssues = newState.status.get(destinationStatusId).issues
            const [removedToMove] = sourceIssues.splice(action.startIndex, 1);
            destinationIssues.splice(action.endIndex, 0, removedToMove);
            //Update history
            return newState
        case CREATE_SUCCESS_STATUS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.status = newState.status.push(action.data)
            return newState
        case DELETE_SUCCESS_STATUS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.status.detele(action.id)
            return newState
        case UPDATE_SUCCESS_STATUS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.status.detele(action.id)
            newState.status.push(action.data)
            return newState
        case APPEND_SUCCESS_STATUS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.status.push(action.data)
            return newState
        case ERROR_STATUS:
            return Object.assign({}, state, { loading: false, authenticated: false })
        case UNDO_REORDER_ISSUE:
            newState = Object.assign({}, state, { loading: false, authenticated: false })
            newState.status = newState.pastStatus
            return newState
        case UNDO_MOVE_ISSUE:
            newState = Object.assign({}, state, { loading: false, authenticated: false })
            newState.status = newState.pastStatus
            newState.statusOrder = newState.pastStatusOrder
            return newState
        default:
            return state;
    }


};

