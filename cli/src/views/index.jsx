import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import Landing from "./Shop/Landing";

import AppLayout from "containers/Layout/AppLayout";
import AuthLayout from "containers/Layout/AuthLayout";

class RootRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/app" component={AppLayout}/>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/auth" component={AuthLayout}/>
            </Switch>
        )
    }
}

export default RootRoutes;
