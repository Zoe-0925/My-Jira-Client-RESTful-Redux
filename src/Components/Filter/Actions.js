export const FILTER_BY_EPIC = "FILTER_BY_EPIC"
export const FILTER_BY_LABEL = "FILTER_BY_LABEL"
export const FILTER_BY_ASSIGNEE = "FILTER_BY_ASSIGNEE"
export const CLEAN_FILTER = "CLEAN_FILTER"
export const GROUP_BY_ASSIGNEE= "GROUP_BY_ASSIGNEE"
export const GROUP_BY_EPIC= "GROUP_BY_EPIC"
export const GROUP_BY_SUBTASK= "GROUP_BY_SUBTASK"


export const filterByEpic = (data) => {
    return {
        type: FILTER_BY_EPIC,
        data: data
    }
}

export const filterByLabel = (data) => {
    return {
        type: FILTER_BY_LABEL,
        data: data
    }
}

export const filterByAssignee = (data) => {
    return {
        type: FILTER_BY_ASSIGNEE,
        data: data
    }
}

export const groupByAssignee = () => {
    return {
        type: GROUP_BY_ASSIGNEE,
    }
}

export const groupByEpic = () => {
    return {
        type: GROUP_BY_EPIC,
    }
}

export const groupBySubtask = () => {
    return {
        type: GROUP_BY_SUBTASK,
    }
}

export const cleanFilter = ()=>{
    return {
        type: CLEAN_FILTER,
    }
}