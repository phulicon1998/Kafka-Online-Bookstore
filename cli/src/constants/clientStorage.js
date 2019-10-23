import jwtDecode from "jwt-decode";
import {clearAuthData, addUser} from "appRedux/actions/user";
import {setTokenHeader, apiCall} from "constants/apiCall";
import {reloadCart} from "appRedux/actions/cart";

export default async function extractStorage(store) {
    try {
        // Check authentication data
        if(localStorage.token) {
            setTokenHeader(localStorage.token);
            if(sessionStorage.auth) {
                const user = JSON.parse(sessionStorage.auth);
                store.dispatch(addUser(user));
            } else {
                let tokenData = jwtDecode(localStorage.token);
                let user = await apiCall("get", `/api/user/${tokenData._id}`);
                sessionStorage.setItem("auth", JSON.stringify(user));
                store.dispatch(addUser(user));
            }
        }

        // Check cart data
        if(localStorage.kCart) {
            store.dispatch(reloadCart(JSON.parse(localStorage.kCart)));
        }
    } catch(err) {
        console.log(err);
        store.dispatch(clearAuthData());
    }

}
