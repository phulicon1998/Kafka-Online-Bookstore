import rootReducer from "./reducers";
import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";

export default function configureStore(){
    const store = createStore(rootReducer, compose(
        applyMiddleware(createSagaMiddleware()),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
    return store;
}
