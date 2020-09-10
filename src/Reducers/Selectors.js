import { createSelector } from 'reselect'

export const selectStatusReducer = state => state.StatusReducer

export const selectIssueReducer = state => state.IssueReducer

export const selectProjectReducer = state => state.ProjectReducer

export const selectFilterReducer = state => state.FilterReducer

export const selectLabelReducer = state => state.LabelReducer

export const selectUserReducer = state => state.UserReducer
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

export const selectCurrentProjectObject = createSelector(
    selectProjectReducer,
    reducer => reducer.currentProject
)

export const selectProjectMembers = createSelector(
    selectProjectReducer,
    reducer => reducer.currentProject.members
)

export const selectMemberNames = createSelector(
    selectProjectMembers,
    selectUserReducer,
    (members, userReducer) => {
        const memberNames = members.map(each => {
            if (userReducer.currentUser._id === each) { return userReducer.currentUser.name }
            else {
                return userReducer.users.find(user => user._id === each)
            }
        })
        return memberNames
    }
)

export const selectCurrentProjectName = createSelector(
    selectProjectReducer,
    reducer => reducer.currentProject.name
)

export const selectCurrentUser = createSelector(
    selectUserReducer,
    reducer => reducer.currentUser._id
)

export const selectUserById = (id) => createSelector(
    selectUserReducer,
    selectCurrentUser,
    (reducer, currentUserId) => {
        if (currentUserId === id) { return reducer.currentUser }
        else { return reducer.users.find(user => user._id === id) }
    }
)

export const selectIssueArray = createSelector(
    selectIssueReducer,
    reducer => reducer.issues.values()
)

export const selectEpics = createSelector(
    selectIssueReducer,
    reducer => reducer.epics
)

//TODO: This should select a wrong key/value array
// Check usage and maybe use selectIssueA
export const selectIssues = createSelector(
    selectIssueReducer,
    issueReducer => issueReducer.issues
)

export const selectLabels = createSelector(
    selectLabelReducer,
    reducer => reducer.labels
)

export const selectLabelNames = createSelector(
    selectLabels,
    labels => labels.map(each => each.name)
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

