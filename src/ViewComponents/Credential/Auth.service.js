import { parseJSON, isValid, isBefore, addDays } from 'date-fns'

export function setLocalStorage(token) {
    //expiresIn is "1 day"
    const expiresAt = addDays(new Date(), 1)
    localStorage.setItem('token', token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt));
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
}

export function isLoggedIn() {
    const expires_at = getExpiration()
    if (expires_at === undefined || !isBefore(getExpiration(), new Date())) { return false }
    return true
}

export function isLoggedOut() {
    return !isLoggedIn();
}

export function getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (expiration === null || !isValid(new Date(expiration))) { return "" }
    return new Date(expiration)
}

export function getExpirationOld() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return format(expiresAt, 'MM/dd/yyyy-H:mm:ss');
}




