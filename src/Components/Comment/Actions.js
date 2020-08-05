import axios from 'axios'
const BASE = 'http://localhost:8080/api/'

function createComment(item) {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/api/comments/',
        data: item
    });
}

function fetchCommentById(id) {//fetch all projects of a Comment
    return axios.get(BASE + 'comments/' + id);
}

function fetchAllComments(id) {//fetch all Comments in a project
    return axios.get(BASE + 'comments/issue/' + id);
}

//TODO not sure if it's useful. Maybe delete later
function updateComment(id, update) {//fetch all projects of a Comment
    return axios.put(BASE + 'comments/' + id, update);
}

function deleteCommentById(id) {//fetch all projects of a Comment
    return axios.delete(BASE + 'comments/' + id);
}

