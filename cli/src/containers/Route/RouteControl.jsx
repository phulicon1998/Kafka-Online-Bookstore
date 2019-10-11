import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {GUEST_PERMISSION} from "constants/credentialControl";

// User Access Control
import * as permissions from "constants/credentialControl";

function RouteControl({access, path, component, redirectPath, role, ...props}) {
    // convert access list to access code list
    let passport = access.map(v => permissions[v]);
    let canAccess = passport.indexOf(role) !== -1;
    if(canAccess) {
        return <Route path={path} component={component}/>;
    } else {
        return <Redirect to={redirectPath}/>
    }
}

function mapState({user}){
    return {role: user.data.role ? user.data.role.code : GUEST_PERMISSION};
}

export default connect(mapState, null)(RouteControl);
