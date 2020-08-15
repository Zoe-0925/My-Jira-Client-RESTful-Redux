import { createSelector } from 'reselect'

export const selectStatusReducer = state => state.StatusReducer

export const selectIssueReducer = state => state.IssueReducer

export const selectProjectReducer = state => state.ProjectReducer

export const selectFilterReducer = state => state.FilterReducer

export const selectLabelReducer = state => state.LabelReducer

export const selectUserReducer= state => state.UserReducer
/****************** Reselectors *********************/
export const selectStatus = createSelector(
    selectStatusReducer,
    statusReducer => statusReducer.status
)

export const selectStatusOrder = createSelector(
    selectStatusReducer,
    statusReducer => statusReducer.statusOrder
)

export const selectCurrentProject = createSelector(
    selectProjectReducer,
    reducer => reducer.currentProject._id
)

export const selectCurrentProjectName = createSelector(
    selectProjectReducer,
    reducer => reducer.currentProject.name
)

export const selectCurrentUser = createSelector(
    selectUserReducer,
    reducer => reducer.id
)

export const selectIssueArray = createSelector(
    selectIssueReducer,
    reducer => reducer.issues.values()
)

export const selectEpics = createSelector(
    selectIssueReducer,
    reducer => reducer.epics
)

export const selectIssues = createSelector(
    selectIssueReducer,
    issueReducer => issueReducer.issues
)

export const selectLabels = createSelector(
    selectLabelReducer,
    reducer => reducer.labels
)

/****************** Reselectors - Filters *********************/

export const selectNoneFilter = createSelector(
    selectFilterReducer,
    filters => filters.none
)


export const selectFilterByEpic = createSelector(
    selectFilterReducer,
    filters => filters.epicFilter
)

export const selectFilterByLabel = createSelector(
    selectFilterReducer,
    filters => filters.labelFilter
)

export const selectFilterByAssignee = createSelector(
    selectFilterReducer,
    filters => filters.assigneeFilter
)

export const selectGroupBy = createSelector(
    selectFilterReducer,
    filters => filters.groupBy
)

