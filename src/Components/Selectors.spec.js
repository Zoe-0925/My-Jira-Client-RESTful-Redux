import {
    selectStatusReducer, selectIssueReducer, selectProjectReducer, selectFilterReducer,
    selectLabelReducer, selectUserReducer, selectStatus, selectStatusOrder,
    selectCurrentProjectName, selectCurrentUser, selectUserById, selectIssueArray,
    selectEpics, selectIssues, selectLabels, selectLabelNames,
} from "./Selectors"

const issues = new Map({ "test issue id1": "test issue value1" }, { "test issue id2": "test issue value2" })
const state = {
    StatusReducer: {
        status: "test status",
        statusOrder: [1, 2, 3, 4]
    },
    IssueReducer: { issues: issues, epics: [] },
    ProjectReducer: {
        currentProject: { _id: "test id", name: "current project name" },
        members: ["test id1", "test id2"]
    },
    FilterReducer: {
        filters: {
            none: true,
            epicFilter:"test epic filter",
            labelFilter: "test label filter",
            assigneeFilter: "test assignee filter",
            groupBy:"test group by"
        }
    },
    LabelReducer: {
        labels: [{ name: "test label1" }]
    },
    UserReducer: {
        currentUser: "test id3",
        users: [
            { _id: "test id1", name: "test name1" },
            { _id: "test id2", name: "test name2" },
            { _id: "test id3", name: "test name3" }
        ]
    }
}

describe("selectStatusReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectStatusReducer(state)
        expect(result).toEqual(state.StatusReducer)
    })
})

describe("selectIssueReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectIssueReducer(state)
        expect(result).toEqual(state.IssueReducer)
    })
})

describe("selectProjectReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectProjectReducer(state)
        expect(result).toEqual(state.ProjectReducer)
    })
})

describe("selectFilterReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectFilterReducer(state)
        expect(result).toEqual(state.FilterReducer)
    })
})

describe("selectLabelReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectLabelReducer(state)
        expect(result).toEqual(state.LabelReducer)
    })
})

describe("selectUserReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectUserReducer(state)
        expect(result).toEqual(state.UserReducer)
    })
})

/****************** Reselectors *********************/
describe("selectStatus(state)", () => {
    it("should select the specified value", () => {
        const result = selectStatus
        expect(result).toEqual(state.StatusReducer.status)
    })
})

describe("selectStatusOrder(state)", () => {
    it("should select the specified value", () => {
        const result = selectStatusOrder
        expect(result).toEqual(state.StatusReducer.statusOrder)
    })
})

describe("selectCurrentProject(state)", () => {
    it("should select the specified value", () => {
        const result = selectCurrentProject
        expect(result).toEqual(state.ProjectReducer.currentProject._id)
    })
})

describe("selectProjectMembers(state)", () => {
    it("should select the specified value", () => {
        const result = selectProjectMembers
        expect(result).toEqual(state.ProjectReducer.currentProject.members)
    })
})

describe("selectMemberNames(state)", () => {
    it("should select the specified value", () => {
        const result = selectMemberNames
        expect(result).toEqual(["test name1", "test name2"])
    })
})

describe("selectCurrentProjectName", () => {
    it("should select the specified value", () => {
        const result = selectCurrentProjectName
        expect(result).toEqual(state.ProjectReducer.currentProject.name)
    })
})

describe("selectCurrentUser", () => {
    it("should select the specified value", () => {
        const result = selectCurrentUser
        expect(result).toEqual(state.UserReducer.currentUser._id)
    })
})

//TODO
describe("selectUserById(id)", () => {
    it("should select the specified value", () => {
        const result = selectUserById(id)
        expect(result).toEqual({ _id: "test id3", name: "test name3" })
    })
})

describe("selectIssueArray", () => {
    it("should select the specified value", () => {
        const result = selectIssueArray
        expect(result).toEqual(["test issue value1", "test issue value2"])
    })
})


describe("selectEpics", () => {
    it("should select the specified value", () => {
        const result = selectEpics
        expect(result).toEqual(state.IssueReducer.epics)
    })
})

describe("selectIssues", () => {
    it("should select the specified value", () => {
        const result = selectIssues
        expect(result).toEqual(state.IssueReducer.issues)
    })
})

describe("selectLabels", () => {
    it("should select the specified value", () => {
        const result = selectLabels
        expect(result).toEqual(state.LabelReducer.labels)
    })
})

describe("selectLabelNames", () => {
    it("should select the specified value", () => {
        const result = selectLabelNames
        expect(result).toEqual(state.LabelReducer.labels.map(each => each.name))
    })
})
/****************** Reselectors - Filters *********************/

describe("selectNoneFilter", () => {
    it("should select the specified value", () => {
        const result = selectNoneFilter
        expect(result).toEqual(state.FilterReducer.filters.none)
    })
})

describe("selectFilterByEpic", () => {
    it("should select the specified value", () => {
        const result = selectFilterByEpic
        expect(result).toEqual(state.FilterReducer.filters.epicFilter)
    })
})

describe("selectFilterByLabel", () => {
    it("should select the specified value", () => {
        const result = selectFilterByLabel
        expect(result).toEqual(state.FilterReducer.filters.labelFilter)
    })
})

describe("selectFilterByAssignee", () => {
    it("should select the specified value", () => {
        const result = selectFilterByAssignee
        expect(result).toEqual(state.FilterReducer.filters.assigneeFilter)
    })
})

describe("selectGroupBy", () => {
    it("should select the specified value", () => {
        const result = selectGroupBy
        expect(result).toEqual(state.FilterReducer.filters.groupBy)
    })
})

