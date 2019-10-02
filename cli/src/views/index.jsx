import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import ShopLayout from "containers/Layout/ShopLayout";
import AppLayout from "containers/Layout/AppLayout";
import AuthLayout from "containers/Layout/AuthLayout";

class RootRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/app" component={AppLayout}/>
                <Route path="/auth" component={AuthLayout}/>
                <Route path="/" component={ShopLayout}/>
            </Switch>
        )
    }
}

export default RootRoutes;
