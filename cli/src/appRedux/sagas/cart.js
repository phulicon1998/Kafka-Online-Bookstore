import {takeLatest, put} from "redux-saga/effects";
import {
    SEND_ADD_CART,
    SEND_EMPTY_CART,
    SEND_CHANGE_CART,
    SEND_REMOVE_CART
} from "constants/ActionTypes";
import {reloadCart, emptyCart} from "appRedux/actions/cart";

function* hdSendAddCart({value}) {
    let cart = [];
    if(localStorage.kCart) {
        // cart already contains book so we get list
        cart = JSON.parse(localStorage.kCart);
        let exist = 0;

        // if the book is already inside cart, increase the quantity
        cart.forEach(v => {
            if(v.edition_id === value.edition_id) {
                v.quantity += value.quantity;
                exist += 1;
            }
        })

        // if not inside cart, add new
        if(exist === 0) cart = [...cart, value];
    } else {
        // empty cart so no need of checking, just add new
        cart.push(value);
    }

    // Save changes in storage
    localStorage.setItem("kCart", JSON.stringify(cart));

    yield put(reloadCart(cart));
}

function* hdSendEmptyCart() {
    localStorage.removeItem("kCart");
    yield put(emptyCart());
}

function* hdSendChangeCart({value}) {
    let cart = JSON.parse(localStorage.kCart);
    cart.forEach(v => {
        if(v.edition_id === value.edition_id){
            v.quantity += value.quantity;
        }
    })

    // Save changes in storage
    localStorage.setItem("kCart", JSON.stringify(cart));

    yield put(reloadCart(cart));
}

function* hdSendRemoveCart({value}) {
    let cart = JSON.parse(localStorage.kCart);
    cart = cart.filter(e => e.edition_id !== value.edition_id);

    // Save changes in storage
    localStorage.setItem("kCart", JSON.stringify(cart));

    yield put(reloadCart(cart));
}

export const cartSagas = [
    takeLatest(SEND_ADD_CART, hdSendAddCart),
    takeLatest(SEND_EMPTY_CART, hdSendEmptyCart),
    takeLatest(SEND_CHANGE_CART, hdSendChangeCart),
    takeLatest(SEND_REMOVE_CART, hdSendRemoveCart)
]
