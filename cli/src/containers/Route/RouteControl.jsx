import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {GUEST_PERMISSION} from "constants/credentialControl";

// User Access Control
import * as permissions from "constants/credentialControl";

function RouteControl({access, inaccess=[], path, component, redirectPath, role, ...props}) {
    // convert access list to access code list
    let allowedPassport = access.map(v => permissions[v]);
    let unallowedPassport = inaccess.map(v => permissions[v]);
    let containAccessPass = (role.filter(r => allowedPassport.indexOf(r.code) !== -1)).length > 0;
    let containInaccessPass = (role.filter(r => unallowedPassport.indexOf(r.code) !== -1)).length > 0;
    // it it contain at least one access and no inaccess code, it can get pass
    if(containAccessPass && !containInaccessPass) {
        return <Route path={path} component={component}/>
    } else {
        return <Redirect to={redirectPath}/>
    }
}

function mapState({user}){
    return {
        role: user.data.role ? user.data.role : [{code: GUEST_PERMISSION}]
    };
}

export default connect(mapState, null)(RouteControl);
