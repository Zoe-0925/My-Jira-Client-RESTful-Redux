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

/**
 * 
 * @param {*} password - The password string that the user inputs to the password field in the register form
 * 
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 * 
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
export function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}

export function getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return format(expiresAt, 'MM/dd/yyyy-H:mm:ss');
}
