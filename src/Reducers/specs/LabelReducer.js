import {
    CREATE_SUCCESS_LABEL,
    DELETE_SUCCESS_LABEL,
    APPEND_SUCCESS_LABELS,
    LOADING_LABEL,
    ERROR_LABEL
} from "../../Actions/LabelActions"

const initialState = {
    loading: false,
    authenticated: false,
    errorMessage: "",
    labels: ["test label1"]
}

describe('Label Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(LabelReducer(undefined, {})).toEqual(initialState)
    })

    it.skip('should handle LOADING_LABEL', () => {
        const updatedState = { ...initialState, loading: true, authenticated: false }
        expect(
            LabelReducer(undefined, { type: LOADING_LABEL })
        ).toEqual(updatedState)
    })

    
})