import {combineReducers} from "redux";
import settings from "./settings";
import user from "./user";
import message from "./message";

const reducers = combineReducers({settings, user, message});

export default reducers;
