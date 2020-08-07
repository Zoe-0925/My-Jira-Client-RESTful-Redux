import axios from 'axios'
import { post, put, jwtConfig } from "../Util"


//TODO 
//Seems like I still need create and delete actions so that the thunk will be initiated

export const LOADING_LABEL = "LOADING_LABEL"
export const ERROR_LABEL = "ERROR_LABEL"
export const CREATE_SUCCESS_LABEL = "CREATE_SUCCESS_LABEL"
export const DELETE_SUCCESS_LABEL = "DELETE_SUCCESS_LABEL"
export const APPEND_SUCCESS_LABELS = "APPEND_SUCCESS_LABELS"

export function createSuccessfulLabel(data) {
    return {
        type: CREATE_SUCCESS_LABEL,
        data: data
    }
}

//export const GET_LABEL_BY_ID = "GET_LABEL_BY_ID"
//export const GET_ALL_LABELS = "GET_ALL_LABELS"

/**    Thunk Actions    */
export function createLabel(data, token) {
    return dispatch => {
        dispatch({ type: LOADING_LABEL })
        try {
            const response = await dispatch(fetchCreateLabel(process.env.BASE, data, token))
            const json = await response.json()
            if (json.data.success) {
                data._id = json.data.id
                dispatch(createSuccessfulLabel(json.data.data))
            }
            else {
                dispatch({ type: ERROR_LABEL })
                let loginMessage = json.data.message
                return loginMessage
            }
        }
        catch (err) {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }

}

export function deleteLabel(id) {

}

export function getAllLabels(projectId, token) {
    return dispatch => {
        dispatch({ type: LOADING_LABEL })
        try {
            const response = await dispatch(fetchAllLabels(process.env.BASE, projectId, token))
            const json = await response.json()
            if (json.data.success) {
                dispatch(loginSuccess(data))
            }
            else {
                dispatch({ type: ERROR_LABEL })
                let loginMessage = json.data.message
                return loginMessage
            }
        }
        catch (err) {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
        }
    }
}
/****************************************************************************/

/**    API Call Actions    */
export function fetchCreateLabel(BASE, item, token) {
    return post("/labels/", BASE, item, token)
}

export function fetchLabelById(BASE, id, token) {//fetch all projects of a Label
    return axios.get(BASE + '/labels/' + id, jwtConfig(token));
}

export function fetchAllLabels(BASE, id, token) {//fetch all labels in a project
    return axios.get(BASE + '/labels/project/' + id, jwtConfig(token));
}

//TODO not sure if it's useful. Maybe delete later
export function fetchUpdateLabel(BASE, id, update, token) {//fetch all projects of a Label
    return put("/labels/" + id, BASE, update, token)
}

export function deleteLabelById(BASE, id, token) {//fetch all Labels of a Label
    return axios.delete(BASE + '/labels/' + id, jwtConfig(token));
}

