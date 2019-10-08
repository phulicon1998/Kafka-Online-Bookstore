import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Auth from "./Auth";
import Activate from "./Activate";

function AuthRoutes({match, location}) {
    return (
        <Switch>
            <Route path={`${match.url}/activate/:user_id`} component={Activate}/>
            <Route path={`${match.url}/`} component={Auth}/>
        </Switch>
    )
}

export default withRouter(AuthRoutes);
