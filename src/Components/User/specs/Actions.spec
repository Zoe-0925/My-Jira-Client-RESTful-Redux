import {
    fetchSignUp, fetchLogin, fetchLogout, createUser, fetchUserById, fetchUserByEmail,
    fetchCheckEmail, fetchUpdateUserInfo, fetchUpdateEmail, fetchUpdatePassword, deleteUser
} from '../Actions';
import { post, put, jwtConfig } from "../../Util"
const axios = require('axios');

jest.mock('axios');
jest.mock('post');

describe("signUp", () => {
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
describe("login", () => {
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


describe("api callls", () => {
    it("fetchSignUp should get data from the server", async () => {
        let BASE = "http://localhost:8080/api"
        let item = {
            name: "test name",
            email: "test@email.com",
            hash: "test hash",
            salt: "test dalt",
        }
        let token = "test token"
   

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
