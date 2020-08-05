import axios from 'axios'

const BASE = 'http://localhost:8080/api/'

function createStatus(item) {
    return axios({
        method: 'post',
        url: BASE + 'status/',
        data: item
    });
}

function fetchStatusById(id) {//fetch all projects of a Status
    return axios.get(BASE + 'status/' + id);
}

function fetchAllStatus(id) {//fetch all status in a project
    return axios.get(BASE + 'status/project/' + id);
}

//TODO not sure if it's useful. Maybe delete later
function updateStatus(id, update) {//fetch all projects of a Status
    return axios.put(BASE + 'status/' + id, update);
}

function deleteStatusById(id) {//fetch all projects of a Status
    return axios.delete(BASE + 'status/' + id);
}

