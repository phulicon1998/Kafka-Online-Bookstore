import React from "react";
import Logo from "./Logo";
import {Link} from "react-router-dom";

const Navbar = () => (
    <div className="shop-navbar">
        <div id="left">
            <Logo/>
            <Link to="/">Store</Link>
            <Link to="/">Author</Link>
            <Link to="/">Blogs</Link>
            <Link to="/">About Us</Link>
        </div>
        <div id="right">
            <button>Login</button>
        </div>
    </div>
)

export default Navbar;
