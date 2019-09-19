import React from "react";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";
import Dashboard from "./Dashboard";

function AppRoutes({match, location}) {
    return (
        <Switch>
            <Route path={`${match.url}/dashboard`} component={Dashboard}/>
            <Redirect from={location.pathname} to={`${match.url}/dashboard`}/>
        </Switch>
    )
}

export default withRouter(AppRoutes);
