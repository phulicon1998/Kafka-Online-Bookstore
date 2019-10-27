import React from "react";
import Logo from "components/Shop/Bar/Logo";
import {connect} from "react-redux";
import {clearAuthData} from "appRedux/actions/user";

const Navbar = ({transparent, hideNavs, user, clearAuthData, cart}) => (
    <div className={`shop-navbar ${transparent ? "transparent" : ""}`}>
        <div id="left">
            <Logo/>
            {hideNavs || <ul>
				<li><a href="/store">Store</a></li>
				<li><a href="/">Author</a></li>
				<li><a href="/">Blogs</a></li>
				<li><a href="/">About Us</a></li>
			</ul>}
            {hideNavs || <div>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Enter book or author for searching..."/>
            </div>}
        </div>
        <div id="right">
            <div className="phone">
				<i className="fas fa-phone"></i>
				<div>
					<p>0902-761-143</p>
					<small>Call for ordering</small>
				</div>
			</div>
            {
                !hideNavs && !user.isAuthenticated && <div className="acc">
    				<a href="/auth">
    					<i className="fas fa-user-circle"></i>
    					<div>
    						<p>Account</p>
    						<small>Login</small>
    					</div>
    				</a>
    			</div>
            }
            {
                !hideNavs && user.isAuthenticated && <div className="logged-acc">
                    <div>
                        <i className="fas fa-user-circle"/>
                        <div>
                            <p>{user.data.username}</p>
                            <small>Profile</small>
                        </div>
                        <i className="fas fa-angle-down"/>
                    </div>
                    <ul>
                        <a href="/account/orders"><li>Orders</li></a>
                        <li>Notifications</li>
                        <li onClick={clearAuthData}>Logout</li>
                    </ul>
                </div>
            }
            {
                !hideNavs && <div className="cart">
        			<a href="/cart">
                        <i className="fas fa-shopping-basket"></i>
                        <span>Cart</span>
                        <span>{cart.list.length}</span>
        			</a>
        		</div>
            }
        </div>
    </div>
)

function mapState({user, cart}) {
    return {user, cart}
}

export default connect(mapState, {clearAuthData})(Navbar);
