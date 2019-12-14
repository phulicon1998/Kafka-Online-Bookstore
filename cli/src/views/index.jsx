import React, {useEffect} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import RouteControl from "containers/Route/RouteControl";
import {connect} from "react-redux";
import ioClient from "socket.io-client";

import ShopLayout from "containers/Layout/ShopLayout";
import AppLayout from "containers/Layout/AppLayout";
import AuthLayout from "containers/Layout/AuthLayout";

const socket = ioClient("localhost:8080");

function RootRoutes({user}) {
    useEffect(() => {
        socket.emit("register user", user);
    }, [user]);

    return (
        <Switch>
            <RouteControl
                path="/app"
                redirectPath="/"
                component={AppLayout}
                access={[
                    "ADMIN_PERMISSION",
                    "MANAGER_PERMISSION",
                    "SALESTAFF_PERMISSION",
                    "PROVIDER_PERMISSION"
                ]}
            />
            <Route path="/auth" component={AuthLayout}/>
            <Route path="/" component={ShopLayout}/>
        </Switch>
    )
}

function mapState({user}) {
    return {
        user: user.data
    }
}

export default connect(mapState, null)(RootRoutes);
