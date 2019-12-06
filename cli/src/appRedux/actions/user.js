import {
    SEND_AUTH_DATA,
    SEND_SOCIAL_AUTH_DATA,
    CLEAR_AUTH_DATA,
    ACTIVATED_USER,
    SEND_RELOAD_USER,
    ADD_USER
} from "constants/ActionTypes";

export function sendAuthData(route, authData){
    return {
        type: SEND_AUTH_DATA,
        value: {route, authData}
    }
}

export function sendSocialAuthData(value) {
    return {
        type: SEND_SOCIAL_AUTH_DATA,
        value
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

export function sendReloadUser(user_id) {
    return { type: SEND_RELOAD_USER, value: {user_id} }
}
