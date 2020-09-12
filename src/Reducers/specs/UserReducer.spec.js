import UserReducer from "../UserReducer"
import {
    LOADING_USER,
    LOGIN_SUCCESS_USER,
    ERROR_USER,
    LOGOUT_SUCCESS_USER,
    UPDATE_USER,
    UPDATE_USER_EMAIL,
    UPDATE_USER_PASSWORD,
    ADD_OTHER_USERS,
} from "../../Actions/UserActions"

const initialUser = { _id: "testUserId", name: "userName", email: "test email" }
const newUser = { _id: "new user id", name: "new userName", email: "new test email" }
const newEmail = { email: "newEmail@test.com" }
const newPassword = "testtestesttest"

describe('User Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(UserReducer(undefined, {})).toEqual(
            {
                loading: false,
                authenticated: true,
                currentUser: { _id: "testUserId" },
                users: [initialUser]
            }
        )
    })

    it.skip('should handle LOADING_USER', () => {
        expect(
            UserReducer(undefined, { type: LOADING_USER })
        ).toEqual(
            {
                loading: true,
                authenticated: false,
                currentUser: { _id: "testUserId" },
                users: [initialUser]
            }
        )
    })

    it.skip('should handle LOGIN_SUCCESS_USER', () => {
        expect(
            UserReducer(undefined, { type: LOGIN_SUCCESS_USER, data: newUser })
        ).toEqual(
            {
                loading: false,
                authenticated: true,
                currentUser: newUser,
                users: [initialUser]
            }
        )
    })

    it.skip('should handle LOGOUT_SUCCESS_USER', () => {
        expect(
            UserReducer(undefined, { type: LOGOUT_SUCCESS_USER })
        ).toEqual(
            {
                loading: false,
                authenticated: false,
                currentUser: {},
                users: []
            }
        )
    })

    it.skip('should handle UPDATE_USER', () => {
        expect(
            UserReducer(undefined, { type: UPDATE_USER, data: { user: newUser } })
        ).toEqual(
            {
                loading: false, authenticated: true, currentUser: newUser,
                users: [initialUser]
            }
        )
    })

    it('should handle UPDATE_USER_EMAIL', () => {
        const userAfterUpdate = { _id: "testUserId", name: "userName", email: newEmail }
        expect(
            UserReducer(undefined, { type: UPDATE_USER_EMAIL, email: newEmail })
        ).toEqual(
            {
                loading: false, authenticated: true, currentUser: userAfterUpdate,
                users: [userAfterUpdate]
            }
        )
    })

    it('should handle UPDATE_USER_PASSWORD', () => {
        const userAfterUpdate = { _id: "testUserId", name: "userName", password: newPassword }
        expect(
            UserReducer(undefined, { type: UPDATE_USER_PASSWORD, password: newPassword })
        ).toEqual(
            {
                loading: false, authenticated: true, currentUser: userAfterUpdate,
                users: [userAfterUpdate]
            }
        )
    })

    it('should handle ADD_OTHER_USERS', () => {
        expect(
            UserReducer(undefined, { type: ADD_OTHER_USERS, data: [newUser] })
        ).toEqual(
            {
                loading: false, authenticated: true, currentUser: userAfterUpdate,
                users: [userAfterUpdate, newUser]
            }
        )
    })

    it('should handle ERROR_USER', () => {
      expect(
            UserReducer(undefined, { type: ERROR_USER })
        ).toEqual(
            {
                loading: false, authenticated: false, currentUser: initialUser,
                users: [initialUser]
            }
        )
    })
})

