import mockAxios from 'jest-mock-axios';
import {
    fetchIssueById, appendSuccessfulIssues, appendSuccessfulEpics, appendCurrentIssue,
    createSuccessfulIssue, createSuccessfulEpic, deleteSuccessfulIssue, deleteSuccessfulEpic,
    updateSuccessfulIssue, updateIssueGroup, toggleSuccessfulFlag, dispatchError
} from "../Actions"
import { jwtConfig } from "../../Util"

const data = {}
const id = "test id"

describe.skip("appendSuccessfulIssues(data)", () => {
    it("Creates an action", () => {
        const result = appendSuccessfulIssues(data)
        expect(result).toEqual({
            type: "APPEND_SUCCESS_ISSUES",
            data: data
        })
    })
})

describe.skip("appendSuccessfulEpics(data)", () => {
    it("Creates an action", () => {
        const result = appendSuccessfulEpics(data)
        expect(result).toEqual({
            type: "APPEND_SUCCESS_EPICS",
            data: data
        })
    })
})

describe.skip("appendCurrentIssue(data)", () => {
    it("Creates an action", () => {
        const result = appendCurrentIssue(data)
        expect(result).toEqual({
            type: "APPEND_SUCCESS_CURRENT_ISSUE",
            data: data
        })
    })
})

describe.skip("createSuccessfulIssue(data)", () => {
    it("Creates an action", () => {
        const result = createSuccessfulIssue(data)
        expect(result).toEqual({
            type: "CREATE_SUCCESS_ISSUE",
            data: data
        })
    })
})

describe.skip("createSuccessfulEpic(data)", () => {
    it("Creates an action", () => {
        const result = createSuccessfulEpic(data)
        expect(result).toEqual({
            type: "CREATE_SUCCESS_EPIC",
            data: data
        })
    })
})

describe.skip("deleteSuccessfulIssue(id)", () => {
    it("Creates an action", () => {
        const result = deleteSuccessfulIssue(id)
        expect(result).toEqual({
            type: "DELETE_SUCCESS_ISSUE",
            id: id
        })
    })
})


describe.skip("deleteSuccessfulEpic(id)", () => {
    it("Creates an action", () => {
        const result = deleteSuccessfulEpic(id)
        expect(result).toEqual({
            type: "DELETE_SUCCESS_EPIC",
            id: id
        })
    })
})

describe.skip("updateSuccessfulIssue(data)", () => {
    it("Creates an action", () => {
        const result = updateSuccessfulIssue(data)
        expect(result).toEqual({
            type: "UPDATE_SUCCESS_ISSUE",
            data: data
        })
    })
})

describe.skip("updateSuccessfulEpic(data)", () => {
    it("Creates an action", () => {
        const result = updateSuccessfulEpic(data)
        expect(result).toEqual({
            type: "UPDATE_SUCCESS_EPIC",
            data: data
        })
    })
})

describe.skip("updateIssueGroup(id, data) ", () => {
    it("Creates an action", () => {
        const result = updateIssueGroup(id, data) 
        expect(result).toEqual({
            type: "UPDATE_ISSUE_GROUP",
            id: id,
            data: data
        })
    })
})

describe.skip("toggleSuccessfulFlag(id) ", () => {
    it("Creates an action", () => {
        const result = toggleSuccessfulFlag(id)
        expect(result).toEqual({
            type: "TOGGLE_FLAG",
            id: id
        })
    })
})

describe.skip("dispatchError() ", () => {
    it("Creates an action", () => {
        const result = dispatchError()
        expect(result).toEqual({
            type: "ERROR_ISSUE"
        })
    })
})




afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

const BASE = "http://localhost:8080/api"
const id = "1"
const token = "fake token"

it("fetches data from server", async () => {

    let catchFn = jest.fn(),
        thenFn = jest.fn();

    mockAxios.get(BASE + '/issues/' + id, jwtConfig(token)).then(thenFn).catch(catchFn);
    //fetchIssueById(BASE, id, token).then(thenFn).catch(catchFn);
    expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:8080/api/issues/1", {
        params: {
            token: "fake token",
        },
        headers: {
            "Authorization": "Bearer fake token"
        }
    });

    let responseObj = { data: 'server says hello!' };
    mockAxios.mockResponse(responseObj);


    expect(thenFn).toHaveBeenCalledWith('SERVER SAYS HELLO!');

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
})