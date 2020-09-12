import {
    selectStatusReducer, selectIssueReducer, selectProjectReducer, selectFilterReducer,
    selectLabelReducer, selectUserReducer, selectStatus, selectStatusOrder,
    selectCurrentProject, selectProjectMembers, selectMemberNames,
    selectCurrentProjectName, selectCurrentUser, selectUserById, selectIssueArray,
    selectEpics, selectIssues, selectLabels, selectLabelNames,
    selectNoneFilter, selectGroupBy, selectFilterByAssignee, selectFilterByLabel,
    selectFilterByEpic,
} from "../Selectors"

let issues = new Map()
issues.set("test issue id1", "test issue value1")
issues.set("test issue id2", "test issue value2")
const state = {
    StatusReducer: {
        status: "test status",
        statusOrder: [1, 2, 3, 4]
    },
    IssueReducer: { issues: issues, epics: [] },
    ProjectReducer: {
        currentProject: { _id: "test id", name: "current project name", members:["test id1", "test id2"] },
        members: ["test id1", "test id2"]
    },
    FilterReducer: {
        none: true,
        epicFilter: "test epic filter",
        labelFilter: "test label filter",
        assigneeFilter: "test assignee filter",
        groupBy: "test group by"
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

describe.skip("selectStatusReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectStatusReducer(state)
        expect(result).toEqual(state.StatusReducer)
    })
})

describe.skip("selectIssueReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectIssueReducer(state)
        expect(result).toEqual(state.IssueReducer)
    })
})

describe.skip("selectProjectReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectProjectReducer(state)
        expect(result).toEqual(state.ProjectReducer)
    })
})

describe.skip("selectFilterReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectFilterReducer(state)
        expect(result).toEqual(state.FilterReducer)
    })
})

describe.skip("selectLabelReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectLabelReducer(state)
        expect(result).toEqual(state.LabelReducer)
    })
})

describe.skip("selectUserReducer(state)", () => {
    it("should select the specified value", () => {
        const result = selectUserReducer(state)
        expect(result).toEqual(state.UserReducer)
    })
})

/****************** Reselectors *********************/
describe.skip("selectStatus(state)", () => {
    it("should select the specified value", () => {
        const result = selectStatus(state)
        expect(result).toEqual(state.StatusReducer.status)
    })
})

describe.skip("selectStatusOrder(state)", () => {
    it("should select the specified value", () => {
        const result = selectStatusOrder(state)
        expect(result).toEqual(state.StatusReducer.statusOrder)
    })
})

describe.skip("selectCurrentProject(state)", () => {
    it("should select the specified value", () => {
        const result = selectCurrentProject(state)
        expect(result).toEqual(state.ProjectReducer.currentProject._id)
    })
})

describe.skip("selectProjectMembers(state)", () => {
    it("should select the specified value", () => {
        const result = selectProjectMembers(state)
        expect(result).toEqual(state.ProjectReducer.currentProject.members)
    })
})

describe.skip("selectMemberNames(state)", () => {
    it("should select the specified value", () => {
        const result = selectMemberNames(state)
        expect(result).toEqual(["test name1", "test name2"])
    })
})

describe.skip("selectCurrentProjectName", () => {
    it("should select the specified value", () => {
        const result = selectCurrentProjectName(state)
        expect(result).toEqual(state.ProjectReducer.currentProject.name)
    })
})

describe.skip("selectCurrentUser", () => {
    it("should select the current user successfully", () => {
        const result = selectCurrentUser(state)
        expect(result).toEqual(state.UserReducer.currentUser._id)
    })
})

//TODO
describe("selectUserById(id)", () => {
    it("should select a user other than the current user successfully", () => {
        const result = selectUserById(state, "test id1")
        expect(result).toEqual({ _id: "test id1", name: "test name1" })
  })


    it("should select the current user successfully", () => {
        const result = selectUserById(state, "test id3")
        expect(result).toEqual({ _id: "test id3", name: "test name3" })
    })
})

describe("selectIssueArray", () => {
    it("should select the specified value", () => {
        const result = selectIssueArray(state)
        expect(result).toEqual(["test issue value1", "test issue value2"])
    })
})


describe.skip("selectEpics", () => {
    it("should select the specified value", () => {
        const result = selectEpics(state)
        expect(result).toEqual(state.IssueReducer.epics)
    })
})

describe.skip("selectIssues", () => {
    it("should select the specified value", () => {
        const result = selectIssues(state)
        expect(result).toEqual(state.IssueReducer.issues)
    })
})

describe.skip("selectLabels", () => {
    it("should select the specified value", () => {
        const result = selectLabels(state)
        expect(result).toEqual(state.LabelReducer.labels)
    })
})

describe.skip("selectLabelNames", () => {
    it("should select the specified value", () => {
        const result = selectLabelNames(state)
        expect(result).toEqual(state.LabelReducer.labels.map(each => each.name))
    })
})
/****************** Reselectors - Filters *********************/

describe.skip("selectNoneFilter", () => {
    it("should select the specified value", () => {
        const result = selectNoneFilter(state)
        expect(result).toEqual(state.FilterReducer.none)
    })
})

describe.skip("selectFilterByEpic", () => {
    it("should select the specified value", () => {
        const result = selectFilterByEpic(state)
        expect(result).toEqual(state.FilterReducer.epicFilter)
    })
})

describe.skip("selectFilterByLabel", () => {
    it("should select the specified value", () => {
        const result = selectFilterByLabel(state)
        expect(result).toEqual(state.FilterReducer.labelFilter)
    })
})

describe.skip("selectFilterByAssignee", () => {
    it("should select the specified value", () => {
        const result = selectFilterByAssignee(state)
        expect(result).toEqual(state.FilterReducer.assigneeFilter)
    })
})

describe.skip("selectGroupBy", () => {
    it("should select the specified value", () => {
        const result = selectGroupBy(state)
        expect(result).toEqual(state.FilterReducer.groupBy)
    })
})

