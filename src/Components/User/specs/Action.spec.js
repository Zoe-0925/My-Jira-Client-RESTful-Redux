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