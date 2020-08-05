import axios from 'axios'

const BASE = 'http://localhost:8080/api/'


function createUser(item) {
    return axios({
        method: 'post',
        url: BASE + '/users/',
        data: item
    });
}

function fetchUserById(id) {//fetch all projects of a user
    return axios.get(BASE + '/users/' + id);
}

function fetchUserByEmail(email) {//fetch all projects of a user
    return axios.get(BASE + '/users/email' + email);
}

// @return: {result:boolean}
function fetchCheckEmail(email) {//fetch all projects of a user
    return axios.get(BASE + '/users/checkEmail' + email);
}

function updateUserInfo(id, update) {//fetch all projects of a user
    return axios.put(BASE + '/users/info' + id, update);
}

function updateEmail(id, update) {//fetch all projects of a user
    return axios.put(BASE + '/users/email' + id, update);
}

function updatePassword(id, update) {//fetch all projects of a user
    return axios.put(BASE + '/users/password' + id, update);
}

function deleteUserById(id) {//fetch all projects of a user
    return axios.delete(BASE + '/users/' + id);
}
