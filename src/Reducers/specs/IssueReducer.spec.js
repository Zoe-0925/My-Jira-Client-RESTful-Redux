import {
    LOADING_ISSUE, CREATE_SUCCESS_ISSUE, CREATE_SUCCESS_EPIC, DELETE_SUCCESS_ISSUE,
    UPDATE_SUCCESS_ISSUE, DELETE_SUCCESS_EPIC, UPDATE_SUCCESS_EPIC,
    APPEND_SUCCESS_ISSUES_PARENT, APPEND_SUCCESS_ISSUES_CHILDREN,
    ERROR_ISSUE, UPDATE_ISSUE_GROUP, TOGGLE_FLAG
} from "../../Actions/IssueActions"
import IssueReducer from "../IssueReducer"

const issues = new Map()
issues.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    issueType: "task", flag: false, reportee: "testUserId", project: "test id"
})

const initialState = {
    loading: false,
    issues: issues, //Map()
    epics: [],
    authenticated: false,
    errorMessage:""
}

describe('Issue Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(IssueReducer(undefined, {})).toEqual(initialState)
    })

    it.skip('should handle LOADING_ISSUE', () => {
        expect(
            IssueReducer(undefined, { type: LOADING_ISSUE })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle CREATE_SUCCESS_ISSUE', () => {
        expect(
            IssueReducer(undefined, { type: CREATE_SUCCESS_ISSUE })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle CREATE_SUCCESS_EPIC', () => {
        expect(
            IssueReducer(undefined, { type: CREATE_SUCCESS_EPIC })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle DELETE_SUCCESS_ISSUE', () => {
        expect(
            IssueReducer(undefined, { type: DELETE_SUCCESS_ISSUE })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle DELETE_SUCCESS_EPIC', () => {
        expect(
            IssueReducer(undefined, { type: DELETE_SUCCESS_EPIC })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle UPDATE_SUCCESS_ISSUE', () => {
        expect(
            IssueReducer(undefined, { type: UPDATE_SUCCESS_ISSUE })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle DELETE_SUCCESS_STATUS', () => {
        expect(
            IssueReducer(undefined, { type: DELETE_SUCCESS_STATUS })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle UPDATE_SUCCESS_EPIC', () => {
        expect(
            IssueReducer(undefined, { type: UPDATE_SUCCESS_EPIC })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle UPDATE_ISSUE_GROUP', () => {
        expect(
            IssueReducer(undefined, { type: UPDATE_ISSUE_GROUP })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle APPEND_SUCCESS_ISSUES_PARENT', () => {
        expect(
            IssueReducer(undefined, { type: APPEND_SUCCESS_ISSUES_PARENT })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle APPEND_SUCCESS_ISSUES_CHILDREN', () => {
        expect(
            IssueReducer(undefined, { type: APPEND_SUCCESS_ISSUES_CHILDREN })
        ).toEqual({ ...initialState, loading: true })
    })

    it('should handle TOGGLE_FLAG', () => {
        expect(
            IssueReducer(undefined, { type: TOGGLE_FLAG })
        ).toEqual({ ...initialState, loading: true })
    })

    it.skip('should handle  ERROR_ISSUE', () => {
        expect(
            IssueReducer(undefined, { type: ERROR_ISSUE, data: "err" })
        ).toEqual({ ...initialState, errorMessage: "err" }
        )
    })

})