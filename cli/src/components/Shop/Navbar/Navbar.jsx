import React from "react";
import Logo from "./Logo";

const Navbar = ({transparent}) => (
    <div className={`shop-navbar ${transparent ? "transparent" : ""}`}>
        <div id="left">
            <Logo/>
            <ul>
				<li><a href="/store">Store</a></li>
				<li><a href="/">Author</a></li>
				<li><a href="/">Blogs</a></li>
				<li><a href="/">About Us</a></li>
			</ul>
            <div>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Enter book or author for searching..."/>
            </div>
        </div>
        <div id="right">
            <div className="phone">
				<i className="fas fa-phone"></i>
				<div>
					<p>0902-761-143</p>
					<small>Call for ordering</small>
				</div>
			</div>
            <div className="acc">
				<a href="/login">
					<i className="fas fa-user-circle"></i>
					<div>
						<p>Account</p>
						<small>Login</small>
					</div>
				</a>
			</div>
            <div className="cart">
				<a href="/cart">
                    <i className="fas fa-shopping-basket"></i>
                    <span>Cart</span>
                    <span>0</span>
				</a>
			</div>
        </div>
    </div>
)

export default Navbar;
