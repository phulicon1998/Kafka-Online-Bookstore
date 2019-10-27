import React from "react";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";
import RouteControl from "containers/Route/RouteControl";

// Views
import Dashboard from "./CRM/index";
import Genre from "./Genre";
import Author from "./Author";
import Book from "./Book";
import Publisher from "./Publisher";
import Provider from "./Provider";
import Edition from "./Edition";
import Order from "./ManageOrder";
import CreateEdition from "./Edition/Create";

function AppRoutes(props) {
    const url = props.match.url;
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route path={`${url}/dashboard`} component={Dashboard}/>
                <RouteControl
                    path={`${url}/genres`}
                    redirectPath="/app/dashboard"
                    component={Genre}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/authors`}
                    redirectPath="/app/dashboard"
                    component={Author}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/books`}
                    redirectPath="/app/dashboard"
                    component={Book}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/publishers`}
                    redirectPath="/app/dashboard"
                    component={Publisher}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/providers`}
                    redirectPath="/app/dashboard"
                    component={Provider}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/editions/add`}
                    redirectPath="/app/dashboard"
                    component={CreateEdition}
                    access={[
                        "PROVIDER_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/editions`}
                    redirectPath="/app/dashboard"
                    component={Edition}
                    access={[
                        "PROVIDER_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/orders`}
                    redirectPath="/app/dashboard"
                    component={Order}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <Redirect from={props.location.pathname} to={`${url}/dashboard`}/>
            </Switch>
        </div>
    )
}

export default withRouter(AppRoutes);
