import {
    CREATE_SUCCESS_COMMENT,
    DELETE_SUCCESS_COMMENT,
    APPEND_SUCCESS_COMMENTS,
    UPDATE_SUCCESS_COMMENT,
    LOADING_COMMENT,
    ERROR_COMMENT
} from "../../Actions/CommentActions"

describe('Comment Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(LabelReducer(undefined, {})).toEqual(initialState)
    })

    it.skip('should handle LOADING_ISSUE', () => {
        const updatedState = { ...initialState, loading: true, authenticated: false }
        expect(
            LabelReducer(undefined, { type: LOADING_ISSUE })
        ).toEqual(updatedState)
    })


    it('should handle CREATE_SUCCESS_COMMENT', () => {

    })

    it('should handle DELETE_SUCCESS_COMMENT', () => {

    })

    it('should handle APPEND_SUCCESS_COMMENTS', () => {

    })

    it('should handle UPDATE_SUCCESS_COMMENT', () => {

    })

    it('should handle ERROR_COMMENT', () => {

    })
})