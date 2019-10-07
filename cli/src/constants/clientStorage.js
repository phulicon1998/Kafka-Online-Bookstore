import jwtDecode from "jwt-decode";
import {clearAuthData, addUser} from "appRedux/actions/user";
import {setTokenHeader, apiCall} from "constants/apiCall";

export default async function extractStorage(store) {
    try {
        if(localStorage.token) {
            setTokenHeader(localStorage.token);
            if(sessionStorage.auth) {
                const user = JSON.parse(sessionStorage.auth);
                return store.dispatch(addUser(user));
            } else {
                let tokenData = jwtDecode(localStorage.token);
                let user = await apiCall("get", `/api/user/${tokenData._id}`);
                sessionStorage.setItem("auth", JSON.stringify(user));
                return store.dispatch(addUser(user));
            }
        }
    } catch(err) {
        console.log(err);
        store.dispatch(clearAuthData());
    }

}
