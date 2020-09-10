import axios from 'axios'
import { format } from 'date-fns' //, compareAsc
import crypto from "crypto"

export const jwtConfig = token => {
    return {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
}

export const post = (url, BASE, item, token) => {
    if (token !== "") {
        return axios({
            method: 'post',
            url: BASE + url,
            data: item,
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    }
    else {
        return axios({
            method: 'post',
            url: BASE + url,
            data: item,
        });
    }
}

export const put = (url, BASE, item, token) => {
    return axios({
        method: 'post',
        url: BASE + url,
        data: item,
        headers: {
            "Authorization": "Bearer " + token
        }
    });
}


