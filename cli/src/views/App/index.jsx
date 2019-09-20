import React from "react";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";
import Dashboard from "./CRM/index";

function AppRoutes({match, location}) {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route path={`${match.url}/dashboard`} component={Dashboard}/>
                <Redirect from={location.pathname} to={`${match.url}/dashboard`}/>
            </Switch>
        </div>
    )
}

export default withRouter(AppRoutes);
