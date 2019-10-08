import {
    SEND_AUTH_DATA,
    CLEAR_AUTH_DATA,
    ACTIVATED_USER,
    ADD_USER
} from "constants/ActionTypes";

export function sendAuthData(route, authData){
    return {
        type: SEND_AUTH_DATA,
        value: {route, authData}
    }
}

export function clearAuthData() {
    return { type: CLEAR_AUTH_DATA }
}

export function addUser(value = {}) {
    return { type: ADD_USER, value }
}

export function activateUser() {
    return { type: ACTIVATED_USER }
}
