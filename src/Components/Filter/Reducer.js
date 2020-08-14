import {
    FILTER_BY_EPIC, FILTER_BY_LABEL, FILTER_BY_ASSIGNEE, CLEAN_FILTER,
    GROUP_BY_ASSIGNEE, GROUP_BY_EPIC, GROUP_BY_SUBTASK
} from "./Actions"

const initialState = {
    epicFilter: "",
    labelFilter: "",
    assigneeFilter: "",
    groupBy: ""
}
export default function FilterReducer(state = initialState, action) {
    switch (action.type) {
        case FILTER_BY_EPIC:
            return { ...state, epicFilter: action.data }
        case FILTER_BY_LABEL:
            return { ...state, labelFilter: action.data }
        case FILTER_BY_ASSIGNEE:
            return { ...state, assigneeFilter: action.data }
        case GROUP_BY_ASSIGNEE:
            return { ...state, groupBy: "assignee" }
        case GROUP_BY_EPIC:
            return { ...state, groupBy: "epic" }
        case GROUP_BY_SUBTASK:
        return { ...state, groupBy: "subtask" }
        case CLEAN_FILTER:
            return initialState
        default:
            return state
    }
}