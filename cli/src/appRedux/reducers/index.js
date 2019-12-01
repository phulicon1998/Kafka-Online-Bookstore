import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import settings from "./settings";
import user from "./user";
import message from "./message";
import cart from "./cart";

const reducers = combineReducers({
    settings, user, message, cart,
    routing: routerReducer,
});

export default reducers;
