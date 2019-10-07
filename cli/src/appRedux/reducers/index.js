import {combineReducers} from "redux";
import settings from "./settings";
import user from "./user";

const reducers = combineReducers({settings, user});

export default reducers;
