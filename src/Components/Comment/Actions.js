import axios from 'axios'
const BASE = 'http://localhost:8080/api/'

export const CREATE_COMMENT = "CREATE_COMMENT"
export const GET_COMMENT_BY_ID = "GET_COMMENT_BY_ID"
export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const DELETE_COMMENT = "UPDATE_COMMENT"

export function createComment(item) {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/api/comments/',
        data: item
    });
}

export function fetchCommentById(id) {//fetch all projects of a Comment
    return axios.get(BASE + 'comments/' + id);
}

export function fetchAllComments(id) {//fetch all Comments in a project
    return axios.get(BASE + 'comments/issue/' + id);
}

//TODO not sure if it's useful. Maybe delete later
export function updateComment(id, update) {//fetch all projects of a Comment
    return axios.put(BASE + 'comments/' + id, update);
}

export function deleteCommentById(id) {//fetch all projects of a Comment
    return axios.delete(BASE + 'comments/' + id);
}

