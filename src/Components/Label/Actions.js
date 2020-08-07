import axios from 'axios'
import { post, put, jwtConfig } from "../Util"

export const CREATE_LABEL = "CREATE_LABEL"
export const GET_LABEL_BY_ID = "GET_LABEL_BY_ID"
export const GET_ALL_LABELS = "GET_ALL_LABELS"
export const UPDATE_LABEL = "UPDATE_LABEL"
export const DELETE_LABEL = "UPDATE_LABEL"

export function createLabel(BASE, item, token) {
    return post("/labels/", BASE, item, token)
}

export function fetchLabelById(BASE, id, token) {//fetch all projects of a Label
    return axios.get(BASE + '/labels/' + id, jwtConfig(token));
}

export function fetchAllLabels(BASE, id, token) {//fetch all labels in a project
    return axios.get(BASE + '/labels/project/' + id, jwtConfig(token));
}

//TODO not sure if it's useful. Maybe delete later
export function updateLabel(BASE, id, update, token) {//fetch all projects of a Label
    return put("/labels/"+ id, BASE, update, token)
}

export function deleteLabelById(BASE, id, token) {//fetch all Labels of a Label
    return axios.delete(BASE + '/labels/' + id, jwtConfig(token));
}

