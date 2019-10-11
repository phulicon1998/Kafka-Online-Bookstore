import {ADD_MESSAGE} from "constants/ActionTypes";

export function addMessage(content="", isNegative=true) {
    return {type: ADD_MESSAGE, value: {content, isNegative}}
}
