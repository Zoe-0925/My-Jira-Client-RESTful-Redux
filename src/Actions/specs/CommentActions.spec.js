import {
    appendSuccessfulComments, createSuccessfulComment, deleteSuccessfulComment,
    updateSuccessfulComment, dispatchError
} from "../CommentActions"

const data = {

}
const id = "test id"

describe.skip("appendSuccessfulComments(data)", () => {
    it("Creates an action", () => {
        const result = appendSuccessfulComments(data)
        expect(result).toEqual({
            type: "APPEND_SUCCESS_COMMENTS",
            data: data
        })
    })
})

describe.skip("createSuccessfulComment(data)", () => {
    it("Creates an action", () => {
        const result = createSuccessfulComment(data)
        expect(result).toEqual({
            type: "CREATE_SUCCESS_COMMENT",
            data: data
        })
    })
})

describe.skip("deleteSuccessfulComment(id)", () => {
    it("Creates an action", () => {
        const result = deleteSuccessfulComment(id)
        expect(result).toEqual({
            type: "DELETE_SUCCESS_COMMENT",
            id: id
        })
    })
})

describe.skip("updateSuccessfulComment(data)", () => {
    it("Creates an action", () => {
        const result = updateSuccessfulComment(id)
        expect(result).toEqual({
            type: "UPDATE_SUCCESS_COMMENT",
            data: data
        })
    })
})


describe.skip("dispatchError()", () => {
    it("Creates an action", () => {
        const result = dispatchError()
        expect(result).toEqual({
            type: "ERROR_COMMENT"
        })
    })
})

/******************** Thunks  ********************************/





/******************** API calls  ********************************/



