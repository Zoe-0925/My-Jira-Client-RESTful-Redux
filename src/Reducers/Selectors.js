import { createSelector } from 'reselect'

export const selectStatusReducer = state => state.StatusReducer

export const selectIssueReducer = state => state.IssueReducer

export const selectProjectReducer = state => state.ProjectReducer

export const selectFilterReducer = state => state.FilterReducer

export const selectLabelReducer = state => state.LabelReducer

export const selectUserReducer = state => state.UserReducer
/****************** Reselectors *********************/
export const selectStatusLoading = createSelector(
    selectStatusReducer,
    statusReducer => statusReducer.loading
)

export const selectStatusAuthenticated = createSelector(
    selectStatusReducer,
    statusReducer => statusReducer.authenticated
)

export const selectStatus = createSelector(
    selectStatusReducer,
    statusReducer => statusReducer.status
)

export const selectStatusOrder = createSelector(
    selectStatusReducer,
    statusReducer => statusReducer.statusOrder
)

/****************** Reselectors - Projects  *********************/
export const selectProjectLoading = createSelector(
    selectProjectReducer,
    reducer => reducer.loading
)

export const selectProjectAuthenticated = createSelector(
    selectProjectReducer,
    reducer => reducer.authenticated
)



export const selectCurrentProject = createSelector(
    selectProjectReducer,
    reducer => reducer.currentProject
)

export const selectAllProjects = createSelector(
    selectProjectReducer,
    reducer => reducer.projects
)

export const selectCurrentProjectObject = createSelector(
    selectCurrentProject,
    selectAllProjects,
    (id, projects) => { return projects.find(item => item._id === id) }
)

export const selectProjectMembers = createSelector(
    selectProjectReducer,
    reducer => reducer.currentProject.members
)

//TODO bug
export const selectMemberNames = createSelector(
    selectProjectMembers,
    selectUserReducer,
    (projectMembers, userReducer) => {
        const members = projectMembers
        const memberNames = members.map(each => {
            return userReducer.users.find(user => user._id === each).name
        })
        return memberNames
    }
)

export const selectCurrentProjectName = createSelector(
    selectCurrentProjectObject,
    project => project.name
)

/****************** Reselectors - Users  *********************/

export const selectUserLoading = createSelector(
    selectUserReducer,
    reducer => reducer.loading
)

export const selectUserAuthenticated = createSelector(
    selectUserReducer,
    reducer => reducer.authenticated
)

export const selectCurrentUser = createSelector(
    selectUserReducer,
    reducer => reducer.currentUser
)

export const selectUserById = (id) => createSelector(
    selectUserReducer,
    reducer => reducer.users.find(user => user._id === id)
)

/****************** Reselectors - Issues  *********************/
export const selectIssueLoading = createSelector(
    selectIssueReducer,
    reducer => reducer.loading
)

export const selectIssueAuthenticated = createSelector(
    selectIssueReducer,
    reducer => reducer.authenticated
)


export const selectIssueArray = createSelector(
    selectIssueReducer,
    reducer => reducer.tasks.values()
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

/****************** Reselectors - Labels  *********************/

export const selectLabelLoading = createSelector(
    selectLabelReducer,
    reducer => reducer.loading
)

export const selectLabelAuthenticated = createSelector(
    selectLabelReducer,
    reducer => reducer.authenticated
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

