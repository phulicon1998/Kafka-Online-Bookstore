import React from "react";
import ShopRoutes from "views/Shop";
import Navbar from "components/Shop/Navbar/Navbar";

export default function ShopLayout(props) {

    function transNavbar() {
        return props.location.pathname === "/";
    }

    return (
        <div>
            <Navbar transparent={transNavbar()}/>
            <ShopRoutes/>
        </div>
    )
}
