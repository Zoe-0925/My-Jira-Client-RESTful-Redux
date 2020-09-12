import StatusReducer from "../StatusReducer"
import {
    LOADING_STATUS, ERROR_STATUS, CREATE_SUCCESS_STATUS, DELETE_SUCCESS_STATUS,
    UPDATE_SUCCESS_STATUS, APPEND_SUCCESS_STATUS, REORDER_ISSUES, MOVE_ISSUES
} from "../../Actions/StatusActions"


const initialUser = { _id: "testUserId", name: "userName", email: "test email" }
const status = new Map()
status.set("1", { _id: "1", name: "TO DO", issues: ["hdkahdjaskdh"] })
status.set("2", { _id: "2", name: "IN PROGRESS", issues: [] })
status.set("3", { _id: "3", name: "DONE", issues: [] })
status.set("4", { _id: "4", name: "TEST", issues: [] })


describe('Status Reducer', () => {
    it('should return the initial state', () => {
        expect(StatusReducer(undefined, {})).toEqual(
            {
                loading: false,
                authenticated: false,
                statusOrder: ["1", "2", "3", "4"],
                status: status,
                pastStatus: status,
                pastStatusOrder: ["1", "2", "3", "4"],
                issues: []
            },
        )
    })

    it('should handle LOADING_STATUS', () => {
        expect(
            StatusReducer(undefined, { type: LOADING_STATUS })
        ).toEqual(
            {
                loading: true,
                authenticated: false,
                statusOrder: ["1", "2", "3", "4"],
                status: status,
                pastStatus: status,
                pastStatusOrder: ["1", "2", "3", "4"],
                issues: []
            }
        )
    })

    it('should handle REORDER_ISSUES', () => {
        it("does not change the issue orders if the start index equals to the end index", () => {
            expect(
                StatusReducer(undefined, { type: REORDER_ISSUES, index: 0, startIndex: 0, endIndex: 0 })
            ).toEqual(
                {
                    loading: false,
                    authenticated: true,
                    statusOrder: ["1", "2", "3", "4"],
                    status: status,
                    pastStatus: status,
                    pastStatusOrder: ["1", "2", "3", "4"],
                    issues: []
                }
            )
        })

        it("changes the issue orders if issues of a particular status have been moved", () => {
            expect(
                StatusReducer(undefined, { type: REORDER_ISSUES, index: 0, startIndex: 0, endIndex: 0 })
            ).toEqual(
                {
                    loading: false,
                    authenticated: true,
                    statusOrder: ["1", "2", "3", "4"],
                    status: status,
                    pastStatus: status,
                    pastStatusOrder: ["1", "2", "3", "4"],
                    issues: []
                }
            )
        })
    })

    it('should handle MOVE_ISSUES', () => {
        it("changes the an issue has been moved to a different status", () => {
            expect(
                StatusReducer(undefined, { type: MOVE_ISSUES, sourceIndex: 0, destinationIndex:1, startIndex: 0, endIndex: 2 })
            ).toEqual(
                {
                    loading: false,
                    authenticated: true,
                    statusOrder: ["1", "2", "3", "4"],
                    status: status,
                    pastStatus: status,
                    pastStatusOrder: ["1", "2", "3", "4"],
                    issues: []
                }
            )
        })
    })

})

