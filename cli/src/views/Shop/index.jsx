import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Landing from "./Landing";
import Cart from "./Cart";
import Store from "./Store";

function ShopRoutes({match, location}) {
    return (
        <Switch>
            <Route path={`${match.url}cart`} component={Cart}/>
            <Route path={`${match.url}store`} component={Store}/>
            <Route exact path={`${match.url}`} component={Landing}/>
        </Switch>
    )
}

export default withRouter(ShopRoutes);
