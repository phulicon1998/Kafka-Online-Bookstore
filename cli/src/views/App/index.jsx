import React from "react";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";

// Views
import Dashboard from "./CRM/index";
import Genre from "./Genre";
import Author from "./Author";

function AppRoutes(props) {
    const url = props.match.url;
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route path={`${url}/dashboard`} component={Dashboard}/>
                <Route path={`${url}/genres`} component={Genre}/>
                <Route path={`${url}/authors`} component={Author}/>
                <Redirect from={props.location.pathname} to={`${url}/dashboard`}/>
            </Switch>
        </div>
    )
}

export default withRouter(AppRoutes);
