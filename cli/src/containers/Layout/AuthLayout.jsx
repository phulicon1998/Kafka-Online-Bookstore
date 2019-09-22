import React from "react";
import AuthRoutes from "views/Auth";
import Navbar from "components/Shop/Navbar/Navbar";
import bg from "assets/imgs/auth.jpg";

function AuthLayout() {
    return (
        <div className="auth-layout" style={{backgroundImage: `url(${bg})`}}>
            <Navbar />
            <AuthRoutes />
        </div>
    )
}

export default AuthLayout;
