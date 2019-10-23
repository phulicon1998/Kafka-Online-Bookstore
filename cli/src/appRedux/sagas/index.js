import {all} from "redux-saga/effects";
import {userSagas} from "./user";
import {cartSagas} from "./cart";

export default function* watchers() {
    yield all([
        ...userSagas,
        ...cartSagas
    ])
}
