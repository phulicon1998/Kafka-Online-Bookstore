import React from "react";
import AuthRoutes from "views/Auth";
import Navbar from "containers/Bar/Navbar";
import bg from "assets/imgs/auth.jpg";

function AuthLayout(props) {

    function transNavbar() {
        return props.location.pathname.includes("/activate");
    }

    function hideNavs() {
        return props.location.pathname.includes("/activate");
    }

    return (
        <div className="auth-layout" style={{backgroundImage: `url(${bg})`}}>
            <Navbar transparent={transNavbar()} hideNavs={hideNavs()}/>
            <AuthRoutes />
        </div>
    )
}

export default AuthLayout;
