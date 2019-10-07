import {takeLatest, call, put} from "redux-saga/effects";
import {
    SEND_AUTH_DATA,
    CLEAR_AUTH_DATA,
    ACTIVATED_USER
} from "constants/ActionTypes";
import api from "constants/api";
import {apiCall, setTokenHeader} from "constants/apiCall";
import {addUser} from "appRedux/actions/user";

function* hdAuthData({value}) {
    try {
        let auth = yield call(apiCall, "post", api.user.auth(value.route), value.authData);
        const {token, ...user} = auth;

        // add token to req headers for user data validation in server
        setTokenHeader(token);

        // store token on localStorage to update data on session
        localStorage.setItem("token", token);

        // store other data on session for pushing to redux store
        sessionStorage.setItem("auth", JSON.stringify(user));

        yield put(addUser(user));
    } catch(err) {
        console.log(err);
    }
}

function* hdClearAuthData() {
    sessionStorage.clear();
    localStorage.clear();
    setTokenHeader(false);
    yield put(addUser());
}

function* hdAfterActivate() {
    sessionStorage.clear();
    yield put(addUser());
}

export const userSagas = [
    takeLatest(SEND_AUTH_DATA, hdAuthData),
    takeLatest(ACTIVATED_USER, hdAfterActivate),
    takeLatest(CLEAR_AUTH_DATA, hdClearAuthData)
]
