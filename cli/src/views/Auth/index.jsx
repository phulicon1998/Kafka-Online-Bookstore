import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Auth from "./Auth";
import Activate from "./Activate";

function AuthRoutes({match, location}) {
    return (
        <Switch>
            <Route path={`${match.url}/`} component={Auth}/>
            <Route path={`${match.url}/activate/:user_id`} component={Activate}/>
        </Switch>
    )
}

export default withRouter(AuthRoutes);
