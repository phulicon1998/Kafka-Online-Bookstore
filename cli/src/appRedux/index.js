import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers";
import {routerMiddleware} from "react-router-redux";
import createSagaMiddleware from "redux-saga";

import watchers from "./sagas";

const createHistory = require("history").createBrowserHistory;

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware =  createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(){
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );
    sagaMiddleware.run(watchers);
    return store;
}

export {history};
