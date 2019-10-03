import React from "react";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";
import Dashboard from "./CRM/index";
import Genre from "./Genre";

function AppRoutes({match, location}) {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route path={`${match.url}/dashboard`} component={Dashboard}/>
                <Route path={`${match.url}/genres`} component={Genre}/>
                <Redirect from={location.pathname} to={`${match.url}/dashboard`}/>
            </Switch>
        </div>
    )
}

export default withRouter(AppRoutes);
