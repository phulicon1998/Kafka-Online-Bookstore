import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Auth from "./Authenticate";
import Activate from "./Activate";
import RouteControl from "containers/Route/RouteControl";

function AuthRoutes(props) {
  const url = props.match.url;
  return (
    <Switch>
      <Route path={`${url}/activate/:user_id`} component={Activate}/>
      <RouteControl
        path={`${url}/`}
        redirectPath="/"
        component={Auth}
        access={[
          "GUEST_PERMISSION"
        ]}
      />
    </Switch>
  )
}

export default withRouter(AuthRoutes);
