import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Landing from "./Landing";
import Cart from "./Cart";

function ShopRoutes({match, location}) {
    return (
        <Switch>
            <Route path={`${match.url}cart`} component={Cart}/>
            <Route exact path={`${match.url}`} component={Landing}/>
        </Switch>
    )
}

export default withRouter(ShopRoutes);
