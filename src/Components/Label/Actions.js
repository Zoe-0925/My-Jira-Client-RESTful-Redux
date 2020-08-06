import axios from 'axios'

const BASE = 'http://localhost:8080/api/'

export const CREATE_LABEL = "CREATE_LABEL"
export const GET_LABEL_BY_ID = "GET_LABEL_BY_ID"
export const GET_ALL_LABELS = "GET_ALL_LABELS"
export const UPDATE_LABEL = "UPDATE_LABEL"
export const DELETE_LABEL = "UPDATE_LABEL"

export function createLabel(item) {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/api/labels/',
        data: item
    });
}

export function fetchLabelById(id) {//fetch all projects of a Label
    return axios.get(BASE + '/labels/' + id);
}

export function fetchAllLabels(id) {//fetch all labels in a project
    return axios.get(BASE + '/labels/project/' + id);
}

//TODO not sure if it's useful. Maybe delete later
export function updateLabel(id, update) {//fetch all projects of a Label
    return axios.put(BASE + '/labels/' + id, update);
}

export function deleteLabelById(id) {//fetch all Labels of a Label
    return axios.delete(BASE + '/labels/' + id);
}

