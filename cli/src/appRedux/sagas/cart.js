import {takeLatest, takeEvery, call, put} from "redux-saga/effects";
import {
    SEND_ADD_CART,
    SEND_EMPTY_CART,
    SEND_CHANGE_CART,
    SEND_REMOVE_CART
} from "constants/ActionTypes";
import {reloadCart, emptyCart, sendRemoveCart} from "appRedux/actions/cart";
import {addMessage} from "appRedux/actions/message";
import api from "constants/api";
import {apiCall} from "constants/apiCall";

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
    for(var edi of cart) {
        if(edi.edition_id === value.edition_id) {
            let amount = edi.quantity + value.quantity;
            if(amount > 0) {
                let rs = yield call(apiCall, ...api.edition.compare(value.edition_id), {amount});
                if(rs.available) {
                    edi.quantity += value.quantity;
                    yield put(addMessage());
                } else {
                    if(rs.storedAmount > 0) {
                        yield put(addMessage("This is the amount we can provide you for this product at the moment."));
                    } else {
                        yield put(addMessage("This book edition is not available anymore."));
                        yield put(sendRemoveCart(value.edition_id));
                    }
                }
            } else {
                yield put(addMessage("You have reached the minimum number of an item in cart."));
            }
        }
    }
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
    takeEvery(SEND_ADD_CART, hdSendAddCart),
    takeLatest(SEND_EMPTY_CART, hdSendEmptyCart),
    takeEvery(SEND_CHANGE_CART, hdSendChangeCart),
    takeLatest(SEND_REMOVE_CART, hdSendRemoveCart)
]
