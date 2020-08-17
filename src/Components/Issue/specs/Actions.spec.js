import mockAxios from 'jest-mock-axios';
import { fetchIssueById } from "../Actions"
import { jwtConfig } from "../../Util"

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