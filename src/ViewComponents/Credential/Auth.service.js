import { format, compareAsc, isBefore, addDays } from 'date-fns'

export function setLocalStorage(token) {
    //expiresIn is "1 day"
    const expiresAt = format(addDays(new Date(), 1), 'MM/dd/yyyy-H:mm:ss');
    localStorage.setItem('id_token', token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
}

export function logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
}

export function isLoggedIn() {
    return isBefore(getExpiration(), new Date())
}

export function isLoggedOut() {
    return !isLoggedIn();
}

export function getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
}

