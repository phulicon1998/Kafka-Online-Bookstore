import {
    RELOAD_CART,
    SEND_ADD_CART,
    EMPTY_CART,
    SEND_EMPTY_CART,
    SEND_REMOVE_CART,
    SEND_CHANGE_CART
} from "constants/ActionTypes";

export function sendAddCart(edition_id, quantity = 1) {
    return {type: SEND_ADD_CART, value: {edition_id, quantity}}
}

export function sendChangeCart(edition_id, quantity) {
    return {
        type: SEND_CHANGE_CART,
        value: {edition_id, quantity}
    }
}

export function sendRemoveCart(edition_id) {
    return {
        type: SEND_REMOVE_CART,
        value: {edition_id}
    }
}

export function reloadCart(list) {
    return {type: RELOAD_CART, value: list}
}

export function sendEmptyCart() {
    return {type: SEND_EMPTY_CART}
}

export function emptyCart() {
    return {type: EMPTY_CART}
}
