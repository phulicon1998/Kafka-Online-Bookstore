import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import RouteControl from "containers/Route/RouteControl";

import ShopLayout from "containers/Layout/ShopLayout";
import AppLayout from "containers/Layout/AppLayout";
import AuthLayout from "containers/Layout/AuthLayout";

class RootRoutes extends Component {
    render() {
        return (
            <Switch>
                <RouteControl
                    path="/app"
                    redirectPath="/"
                    component={AppLayout}
                    access={[
                        "ADMIN_PERMISSION",
                        "MANAGER_PERMISSION",
                        "SALESTAFF_PERMISSION",
                        "PROVIDER_PERMISSION"
                    ]}
                />
                <Route path="/auth" component={AuthLayout}/>
                <Route path="/" component={ShopLayout}/>
            </Switch>
        )
    }
}

export default RootRoutes;
