import {takeLatest, call, put} from "redux-saga/effects";
import {
    SEND_AUTH_DATA,
    CLEAR_AUTH_DATA,
    SEND_RELOAD_USER,
    ACTIVATED_USER
} from "constants/ActionTypes";
import api from "constants/api";
import {apiCall, setTokenHeader} from "constants/apiCall";
import {addUser} from "appRedux/actions/user";
import {addMessage} from "appRedux/actions/message";

function* hdAuthData({value}) {
    try {
        let auth = yield call(apiCall, ...api.user.auth(value.route), value.authData);
        const {token, ...user} = auth;

        // add token to req headers for user data validation in server
        setTokenHeader(token);

        // store token on localStorage to update data on session
        localStorage.setItem("token", token);

        // store other data on session for pushing to redux store
        sessionStorage.setItem("auth", JSON.stringify(user));

        yield put(addUser(user));

        // inform user to check mail after success registration
        if(value.route === "/signup") {
            yield put(addMessage("A verification link from us has been sent to your mail.", false));
        }
    } catch(err) {
        yield put(addMessage(err));
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

function* hdReloadUser({value}) {
    let {token, ...user} = yield call(apiCall, ...api.user.getOne(value.user_id));
    sessionStorage.setItem("auth", JSON.stringify(user));
    localStorage.setItem("token", token);
    yield put(addUser(user));
}

export const userSagas = [
    takeLatest(SEND_AUTH_DATA, hdAuthData),
    takeLatest(ACTIVATED_USER, hdAfterActivate),
    takeLatest(SEND_RELOAD_USER, hdReloadUser),
    takeLatest(CLEAR_AUTH_DATA, hdClearAuthData)
]
