import axios from 'axios'

const BASE = 'http://localhost:8080/api/'


function createProject(item) {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/api/projects/',
        data: item
    });
}

function fetchUsersProjects(id) {//fetch all projects of a user
    return axios.get(BASE + 'projects/user/' + id);
}

function fetchProjectById(id) {//fetch all projects of a user
    return axios.get(BASE + 'projects/' + id);
}

function updateProjectById(id, update) {//fetch all projects of a user
    return axios.put(BASE + 'projects/' + id, update);
}

function deleteProjectById(id) {//fetch all projects of a user
    return axios.delete(BASE + 'projects/' + id);
}

function leaveProjectById(id, userId) {//fetch all projects of a user
    return axios.delete(BASE + 'projects/' + id + '/members/' + userId);
}