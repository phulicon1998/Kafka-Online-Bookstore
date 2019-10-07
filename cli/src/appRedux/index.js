import rootReducer from "./reducers";
import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";

import watchers from "./sagas";

export default function configureStore(){
    const sagaMiddleware =  createSagaMiddleware();
    const store = createStore(rootReducer, compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
    sagaMiddleware.run(watchers);
    return store;
}
