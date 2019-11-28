import React, {useEffect} from "react";
import ShopRoutes from "views/Shop";
import Navbar from "containers/Bar/Navbar";
import Logo from "components/Shop/Bar/Logo";
import FootBook from "components/Shop/Product/FootBook";
import ChatSection from "containers/Box/ChatBox";

import book from "assets/imgs/book.jpg"
const bseller =  [
    {
        img: book,
        name: "Meet at Baghad",
        author: "Hilary Mantel",
        rate: 4.5
    },
    {
        img: book,
        name: "Murder in Metasopomia",
        author: "Hilary Mantel",
        rate: 4.5
    },
    {
        img: book,
        name: "Wolf Hall",
        author: "Hilary Mantel",
        rate: 4.5
    }
]

export default function ShopLayout(props) {

    function transNavbar() {
        return props.location.pathname === "/";
    }

    useEffect(() =>  document.body.classList.add("kafka-layout"), []);

    return (
        <div style={{"position": "relative"}}>
            <Navbar transparent={transNavbar()}/>
            <ChatSection />
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
                            <h4>Bestseller Books</h4>
                            {
                                bseller.map((v, i) => (
                                    <FootBook key={i} {...v}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="footer-bar">
                    <div className="container">
                        <p>2019 All Rights Reserved By © Kafka Bookstore</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
