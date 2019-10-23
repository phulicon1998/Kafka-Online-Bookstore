import {RELOAD_CART} from "constants/ActionTypes";

const DEFAULT_STATE = {
    list: []
}

export default (state = DEFAULT_STATE, action) => {
    const {type, value} = action;
    switch(type){
        case RELOAD_CART:
            return {list: value};
        default:
            return state;
    }
}
