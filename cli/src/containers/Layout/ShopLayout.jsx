import React from "react";
import ShopRoutes from "views/Shop";
import Navbar from "components/Shop/Navbar/Navbar";
import Logo from "components/Shop/Navbar/Logo";

export default function ShopLayout(props) {

    function transNavbar() {
        return props.location.pathname === "/";
    }

    return (
        <div>
            <Navbar transparent={transNavbar()}/>
            <ShopRoutes/>
            <div className="shop-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <Logo bigger />
                            <p>Our mission to give the customers opportunity to enjoy high-quality services to order and receive the best books. Choose your favorite book with us!</p>
                            <div>
                                <i className="fab fa-facebook-f"/>
                                <i className="fab fa-twitter"/>
                            </div>
                            <div>
                                <span>Contact Hotline: 0942-608-024</span>
                            </div>
                            <div>
                                <span>Contact Hotline for Ordering: 0902-761-143</span>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <h4>Getting Started</h4>
                            <ul>
                                <li><a href="/">Privacy Policy</a></li>
                                <li><a href="/">Recruitment</a></li>
                                <li><a href="/">Terms of Use</a></li>
                                <li><a href="/">Customer Service</a></li>
                                <li><a href="/">FAQ</a></li>
                            </ul>
                            <h4>Shop & Cooperation</h4>
                            <ul>
                                <li><a href="/">Cancellations</a></li>
                                <li><a href="/">Returns</a></li>
                                <li><a href="/">Wishlist</a></li>
                                <li><a href="/">Delivery</a></li>
                                <li><a href="/">Selling with Kafka</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h4>Popular Genre</h4>
                            <ul>
                                <li><a href="/">Fantasy</a></li>
                                <li><a href="/">Nonfiction</a></li>
                                <li><a href="/">Thriller</a></li>
                                <li><a href="/">Young Adult Fiction</a></li>
                                <li><a href="/">Science Fiction</a></li>
                                <li><a href="/">Business</a></li>
                                <li><a href="/">Biography</a></li>
                                <li><a href="/">Memoirs</a></li>
                                <li><a href="/">Thriller</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
