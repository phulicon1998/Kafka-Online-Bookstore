import React from "react";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";

// Views
import Dashboard from "./CRM/index";
import Genre from "./Genre";
import Author from "./Author";
import Book from "./Book";
import Publisher from "./Publisher";
import Provider from "./Provider";
import Edition from "./Edition";
import CreateEdition from "./Edition/Create";

function AppRoutes(props) {
    const url = props.match.url;
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route path={`${url}/dashboard`} component={Dashboard}/>
                <Route path={`${url}/genres`} component={Genre}/>
                <Route path={`${url}/authors`} component={Author}/>
                <Route path={`${url}/books`} component={Book}/>
                <Route path={`${url}/publishers`} component={Publisher}/>
                <Route path={`${url}/providers`} component={Provider}/>
                <Route path={`${url}/editions/add`} component={CreateEdition}/>
                <Route path={`${url}/editions`} component={Edition}/>
                <Redirect from={props.location.pathname} to={`${url}/dashboard`}/>
            </Switch>
        </div>
    )
}

export default withRouter(AppRoutes);
