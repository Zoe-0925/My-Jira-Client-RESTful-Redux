import axios from 'axios'

const BASE = 'http://localhost:8080/api/'

function createLabel(item) {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/api/labels/',
        data: item
    });
}

function fetchLabelById(id) {//fetch all projects of a Label
    return axios.get(BASE + 'labels/' + id);
}

function fetchAllLabels(id) {//fetch all labels in a project
    return axios.get(BASE + 'labels/project/' + id);
}

//TODO not sure if it's useful. Maybe delete later
function updateLabel(id, update) {//fetch all projects of a Label
    return axios.put(BASE + 'labels/' + id, update);
}

function deleteLabelById(id) {//fetch all projects of a Label
    return axios.delete(BASE + 'labels/' + id);
}

