import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";

import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import PersonalMenu from "./PersonalMenu";

import OrderDetail from "./OrderDetail";
import Order from "./Order";

function AccountLayout({match, location}) {
    return (
        <div>
            <Breadcrumb
                paths={[
                    {path: "/", name: "Home"}
                ]}
                current="Orders"
            />
            <div className="container" style={{"marginBottom": "50px"}}>
                <div className="row">
                    <div className="col-md-3">
                        <PersonalMenu />
                    </div>
                    <div className="col-md-9">
                        <Switch>
                            <Route path={`${match.url}/orders/:order_id`} component={OrderDetail}/>
                            <Route path={`${match.url}/orders`} component={Order}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(AccountLayout);
