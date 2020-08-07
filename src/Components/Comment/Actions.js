import axios from 'axios'
import { post, put, jwtConfig } from "../Util"

export const CREATE_COMMENT = "CREATE_COMMENT"
export const GET_COMMENT_BY_ID = "GET_COMMENT_BY_ID"
export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const DELETE_COMMENT = "UPDATE_COMMENT"

export function createComment(BASE, item, token) {
    return post("/comments/", BASE, item, token)
}

export function fetchCommentById(BASE, id, token) {//fetch all projects of a Comment
    return axios.get(BASE + '/comments/' + id, jwtConfig(token));
}

export function fetchAllComments(BASE, id, token) {//fetch all Comments in a project
    return axios.get(BASE + '/comments/issue/' + id, jwtConfig(token));
}

//TODO not sure if it's useful. Maybe delete later
export function updateComment(BASE, id, update, token) {//fetch all projects of a Comment
    return put("/comments/" + id, BASE, update, token)
}

export function deleteCommentById(BASE, id, token) {//fetch all projects of a Comment
    return axios.delete(BASE + '/comments/' + id, jwtConfig(token));
}

