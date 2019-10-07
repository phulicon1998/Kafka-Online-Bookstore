import {all} from "redux-saga/effects";
// import * as userSagas from "./user";
import {userSagas} from "./user";

export default function* watchers() {
    yield all([
        ...userSagas
    ])
}
