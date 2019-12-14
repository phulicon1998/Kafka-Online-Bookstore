import React, {useState} from "react";
import Logo from "components/Shop/Bar/Logo";
import {connect} from "react-redux";
import {clearAuthData} from "appRedux/actions/user";
import {withRouter} from "react-router";
import * as permissions from "constants/credentialControl";

function Navbar({transparent, hideNavs, user, clearAuthData, cart, history, role}){
    const [search, setSearch] = useState("");

    function hdKeyDown(e){
        if(e.key === "Enter") {
            setSearch("");
            history.push(`/store/search/${e.target.value}`);
        }
    }

    return(
        <div className={`shop-navbar ${transparent ? "transparent" : ""}`}>
            <div id="left">
                <Logo/>
                {
                    hideNavs || <ul>
    				    <li><a href="/store">Store</a></li>
    				    <li><a href="/">Author</a></li>
    				    <li><a href="/">Blogs</a></li>
    				    <li><a href="/">About Us</a></li>
    			    </ul>
                }
                {
                    hideNavs || <div>
                        <i className="fas fa-search"/>
                        <input
                            type="text"
                            placeholder="Enter book or author for searching..."
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={hdKeyDown}
                        />
                    </div>
                }
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
                            {(role.isCustomer && !role.isProvider) && <a href="/become"><li>Become a seller</li></a>}
                            {(role.isProvider || role.isAdmin || role.isManager || role.isSaleStaff) && <a href="/app/dashboard"><li>Application</li></a>}
                            <li onClick={clearAuthData}>Logout</li>
                        </ul>
                    </div>
                }
                {
                    !hideNavs && role.isCustomer && <div className="cart">
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
}

function mapState({user, cart}) {
    const {isPermit} = permissions;
    return {
        user, cart,
        role: {
            isCustomer: isPermit(user.data.role)(permissions.CUSTOMER_PERMISSION),
            isProvider: isPermit(user.data.role)(permissions.PROVIDER_PERMISSION),
            isSaleStaff: isPermit(user.data.role)(permissions.SALESTAFF_PERMISSION),
            isManager: isPermit(user.data.role)(permissions.MANAGER_PERMISSION),
            isAdmin: isPermit(user.data.role)(permissions.ADMIN_PERMISSION)
        }
    }
}

export default connect(mapState, {clearAuthData})(withRouter(Navbar));
