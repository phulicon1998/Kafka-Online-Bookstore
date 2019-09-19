import React from 'react';
import {BrowserRouter as Router } from "react-router-dom";
import {Provider} from "react-redux";
import RootRoutes from "./views/index";

import "assets/vendors/style";
import configureStore from "appRedux";

const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <Router>
                <RootRoutes/>
            </Router>
        </Provider>
    );
}

export default App;
