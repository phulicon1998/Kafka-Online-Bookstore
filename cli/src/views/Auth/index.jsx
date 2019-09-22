import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Auth from "./Auth";

function AuthRoutes({match, location}) {
    return (
        <Switch>
            <Route path={`${match.url}/`} component={Auth}/>
        </Switch>
    )
}

export default withRouter(AuthRoutes);
