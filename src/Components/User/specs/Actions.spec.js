import {
    fetchSignUp, fetchLogin, fetchLogout, createUser, fetchUserById, fetchUserByEmail,
    fetchCheckEmail, fetchUpdateUserInfo, fetchUpdateEmail, fetchUpdatePassword, deleteUser,

    loginSuccess, dispatchError, updateUser, dispatchUpdateEmail, dispatchUpdatePassword,


} from '../Actions';
import mockAxios from 'jest-mock-axios';
import configureStore from 'redux-mock-store'
import { post, put, jwtConfig } from "../../Util"
const axios = require('axios');


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const data = {
    name: "test",
    email: "test",
    salt: "test",
    hash: "test"
}
const email = "test@gmail.com"

describe.skip("loginSuccess(data)", () => {
    it("should create an action", () => {
        const result = loginSuccess(data)
        expect(result).toEqual({
            type: "LOGIN_SUCCESS_USER",
            data: data
        })

    })
})

describe.skip("dispatchError(data)", () => {
    it("should create an action", () => {
        const result = v(data)
        expect(result).toEqual({
            type: "ERROR_USER",
            data: data
        })

    })
})

describe.skip("updateUser(data)", () => {
    it("should create an action", () => {
        const result = updateUser(data)
        expect(result).toEqual({
            type: "UPDATE_USER",
            data: data
        })

    })
})

describe.skip("dispatchUpdateEmail(email)", () => {
    it("should create an action", () => {
        const result = dispatchUpdateEmail(email)
        expect(result).toEqual({
            type: UPDATE_USER_EMAIL,
            email: email
        })

    })
})

describe.skip("dispatchUpdatePassword(salt, hash)", () => {
    it("should create an action", () => {
        const result = dispatchUpdatePassword(data.salt, data.hash)
        expect(result).toEqual({
            type: UPDATE_USER_PASSWORD,
            salt: data.salt,
            hash: data.hash
        })

    })
})

describe.skip("dispatchAddOtherUsers(userList)", () => {
    it("should create an action", () => {
        const result = dispatchAddOtherUsers([data])
        expect(result).toEqual({
            type: ADD_OTHER_USERS,
            data: [data]
        })

    })
})

describe('async actions', () => {
    let BASE = "http://localhost:8080/api"
    let token = "test token"

    afterEach(() => {
        mockAxios.reset();
    })

    it('fetchSignUp(BASE, item, token) should get the user id from the server', () => {
        let catchFn = jest.fn(),
            thenFn = jest.fn();

        let item = {
            name: "test name",
            email: "test@email.com",
            hash: "test hash",
            salt: "test dalt",
        }

        fetchSignUp(BASE, item, token)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.post).toHaveBeenCalledWith({
            method: 'post',
            url: "http://localhost:8080/api/users/signup",
            data: item,
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseObj = { success: true, data: 'test id' };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith('test id');
        expect(catchFn).not.toHaveBeenCalled();
    })
})




describe.skip("signUp", () => {
    it('validates the inputs and ensures the correct syntax of the email and password', () => {

    })

    it('ensures email has not been registered', () => {

    })

    it('prompts the error message with invalid inputs', () => {

    })

    it('sends an API call to create a new user with valid inputs', () => {

    })

    it('calls the login function in the end', () => {

    })
})

//TODO authentication is here!!! OAuth!!! JWT
describe.skip("login", () => {
    it('sends an API call to create a new user with valid inputs', () => {

    })

    it('prompts the error message if the API request is rejected', () => {

    })

    it('saves the user id into the redux store state if the API request is successful', () => {

    })

    it('redirects to the project board page after saving the user id', () => {

    })
})

describe("logout", () => {
    it('clears the user id in the redux store', () => {

    })

    it('redirects to the login page after clearing the user id', () => {

    })
})

//TODO Bug
describe("api callls", () => {



    it("fetchSignUp(BASE, item, token) should get the user id from the server", async () => {
        let BASE = "http://localhost:8080/api"
        let item = {
            name: "test name",
            email: "test@email.com",
            hash: "test hash",
            salt: "test dalt",
        }
        let token = "test token"

        let catchFn = jest.fn(),
            thenFn = jest.fn();

        // using the component, which should make a server response
        let clientMessage = 'client is saying hello!';

        UppercaseProxy(clientMessage)
            .then(thenFn)
            .catch(catchFn);

        // since `post` method is a spy, we can check if the server request was correct
        // a) the correct method was used (post)
        // b) went to the correct web service URL ('/web-service-url/')
        // c) if the payload was correct ('client is saying hello!')
        expect(mockAxios.post).toHaveBeenCalledWith('/web-service-url/', { data: clientMessage });

        // simulating a server response
        let responseObj = { data: 'server says hello!' };
        mockAxios.mockResponse(responseObj);


        axios.post.mockResolvedValue({
            data: [
                {
                    userId: 1,
                    id: 1,
                    title: 'My First Album'
                },
                {
                    userId: 1,
                    id: 2,
                    title: 'Album: The Sequel'
                }
            ]
        });
        post.mockResolvedValue({
            data: [
                {
                    userId: 1,
                    id: 1,
                    title: 'My First Album'
                },
                {
                    userId: 1,
                    id: 2,
                    title: 'Album: The Sequel'
                }
            ]
        });
        const response = await fetchSignUp('/users/signup', BASE, item, token).data
        expect(response).toEqual({
            data: [
                {
                    userId: 1,
                    id: 1,
                    title: 'My First Album'
                },
                {
                    userId: 1,
                    id: 2,
                    title: 'Album: The Sequel'
                }
            ]
        });

    })
})

export function fetchSignUp(BASE, item, token) {
    return post('/users/signup', BASE, item, token)
}

export function fetchLogin(BASE, item, token) {
    return post('/users/login', BASE, item, token)
}

export function fetchLogout(BASE, item) {
    return post('/users/logout', BASE, item, "")
}

//TODO for testing purpose
export function createUser(BASE, item) {
    return post('/users/', BASE, item, "")
}

export function fetchUserById(BASE, id, token) {//fetch all USERs of a user
    return axios.get(BASE + '/users/' + id, jwtConfig(token));
}

export function fetchUserByIdList(BASE, idList, token) {//fetch all USERs of a user
    return post('/users/multiple', BASE, idList, token)
}

export function fetchUserByEmail(BASE, email, token) {//fetch all USERs of a user
    return axios.get(BASE + '/users/email' + email, jwtConfig(token));
}

// @return: {result:boolean}
export function fetchCheckEmail(BASE, email, token) {//fetch all USERs of a user
    return post('/users/checkEmail', BASE, email, token)
}

export function fetchUpdateUserInfo(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/info/' + id, BASE, update, token)
}

export function fetchUpdateEmail(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/email/' + id, BASE, update, token)
}

export function fetchUpdatePassword(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/password' + id, BASE, update, token)
}

export function deleteUser(BASE, id, token) {//fetch all USERs of a user
    return axios.delete(BASE + '/users/' + id, jwtConfig(token));
}
