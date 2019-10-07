import {ADD_USER} from "constants/ActionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,
    data: {}
}

export default (state = DEFAULT_STATE, action) => {
    const {type, value} = action;
    switch(type){
        case ADD_USER:
            return {
                isAuthenticated: !!Object.keys(value).length,
                data: value
            };
        default:
            return state;
    }
}
