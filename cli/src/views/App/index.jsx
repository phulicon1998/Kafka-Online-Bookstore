import React from "react";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";
import RouteControl from "containers/Route/RouteControl";

// Views
import Dashboard from "./CRM/index";
import Genre from "./Genre";
import Author from "./Author";
import Account from "./Account";
import Book from "./Book";
import Publisher from "./Publisher";
import Provider from "./Provider";
import Edition from "./Edition";
import Order from "./ManageOrder";
import CreateEdition from "./Edition/Add";
import RequestEdition from "./Edition/Request";
import Chat from "./Chat/index";
import Profile from "./Profile";

import BookReport from "./Reports/Book";
import BookReportDetail from "./Reports/Book/Detail";
import CategoryReport from "./Reports/Category";
import CategoryReportDetail from "./Reports/Category/Detail";

function AppRoutes(props) {
    const url = props.match.url;
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route path={`${url}/dashboard`} component={Dashboard}/>
                <Route path={`${url}/profile`} component={Profile}/>
                <RouteControl
                    path={`${url}/genres`}
                    redirectPath="/app/dashboard"
                    component={Genre}
                    access={[
                        "ADMIN_PERMISSION",
                        "SALESTAFF_PERMISSION"
                    ]}
                />
                <RouteControl
                    path={`${url}/authors`}
                    redirectPath="/app/dashboard"
                    component={Author}
                    access={[
                        "ADMIN_PERMISSION",
                        "SALESTAFF_PERMISSION"
                    ]}
                />
                <RouteControl
                    path={`${url}/books`}
                    redirectPath="/app/dashboard"
                    component={Book}
                    access={[
                        "ADMIN_PERMISSION",
                        "SALESTAFF_PERMISSION"
                    ]}
                />
                <RouteControl
                    path={`${url}/publishers`}
                    redirectPath="/app/dashboard"
                    component={Publisher}
                    access={[
                        "ADMIN_PERMISSION",
                        "SALESTAFF_PERMISSION"
                    ]}
                />
                <RouteControl
                    path={`${url}/providers`}
                    redirectPath="/app/dashboard"
                    component={Provider}
                    access={[
                        "SALESTAFF_PERMISSION",
                        "ADMIN_PERMISSION"
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
                    path={`${url}/editions/request`}
                    redirectPath="/app/dashboard"
                    component={RequestEdition}
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
                        "SALESTAFF_PERMISSION",
                        "ADMIN_PERMISSION"
                    ]}
                />
                <RouteControl
                    path={`${url}/orders`}
                    redirectPath="/app/dashboard"
                    component={Order}
                    access={[
                        "ADMIN_PERMISSION",
                        "SALESTAFF_PERMISSION"
                    ]}
                />
                <RouteControl
                    path={`${url}/accounts`}
                    redirectPath="/app/accounts"
                    component={Account}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/chat`}
                    redirectPath="/app/dashboard"
                    component={Chat}
                    access={[
                        "ADMIN_PERMISSION",
                        "SALESTAFF_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/reports/category/detail`}
                    redirectPath="/app/dashboard"
                    component={CategoryReportDetail}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/reports/category`}
                    redirectPath="/app/dashboard"
                    component={CategoryReport}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/reports/book/detail`}
                    redirectPath="/app/dashboard"
                    component={BookReportDetail}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/reports/book`}
                    redirectPath="/app/dashboard"
                    component={BookReport}
                    access={[
                        "ADMIN_PERMISSION",
                    ]}
                />
                <RouteControl
                    path={`${url}/reports/category`}
                    redirectPath="/app/dashboard"
                    component={Chat}
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
