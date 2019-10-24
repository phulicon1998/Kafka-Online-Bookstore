import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import RouteControl from "containers/Route/RouteControl";

import Landing from "./Landing";
import Cart from "./Cart";
import Store from "./Store";
import Become from "./Become";

function ShopRoutes({match, location}) {
    return (
        <Switch>
            <Route path={`${match.url}cart`} component={Cart}/>
            <Route path={`${match.url}store`} component={Store}/>
            <RouteControl
                path={`${match.url}become`}
                redirectPath="/"
                component={Become}
                access={[
                    "CUSTOMER_PERMISSION",
                ]}
                inaccess={[
                    "PROVIDER_PERMISSION"
                ]}
            />
            <Route exact path={`${match.url}`} component={Landing}/>
        </Switch>
    )
}

export default withRouter(ShopRoutes);
