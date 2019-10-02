import React, {useState} from "react";
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import TitleBar from "components/Shop/Bar/TitleBar";
import Book from "components/Shop/Product/Book";
import {genres, discounts, storeBooks} from "./data";

import evA from "assets/imgs/gA.jpg"
import evB from "assets/imgs/ev-a.jpg";

const List = ({data}) => (
    <ul className="store-nav-list">
        {data.map((v, i) => ( <li key={i}><a href="/">{v}</a></li> )) }
    </ul>
)

const StarFilter = () => {
    return (
        <div className="star-filter">
            {
                [4, 3, 2, 1].map((star, i) => (
                    <div key={i}>
                        {
                            Array.apply(null, Array(star)).map((v, j) => (
                                <i className="fas fa-star colorized" key={j}/>
                            ))
                        }
                        {
                            Array.apply(null, Array(5 - star)).map((v, j) => (
                                <i className="fas fa-star" key={j}/>
                            ))
                        }
                        <span> (at least)</span>
                    </div>
                ))
            }
        </div>
    )
}


function Store() {
    const [filterFast, setFilterFast] = useState(false);
    const fastDeliBook = () => setFilterFast(prev => !prev);

    return (
        <div>
            <Breadcrumb
                paths={[
                    {path: "/", name: "Home"}
                ]}
                current="Store"
                viewed
            />
            <div className="event-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div style={{"backgroundImage": `url(${evA})`}}>
                                <h2>Upcoming books</h2>
                                <p>Calendar of upcoming books on Kafka Stores and pre-order</p>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div style={{"backgroundImage": `url(${evB})`}}>
                                <h2>Kafka Recommends</h2>
                                <p>Take a look to the list of favourite books from Kafka and choose for yourself</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <TitleBar icon="fas fa-list-ul" title="Book Category"/>
                        <List data={genres}/>
                        <TitleBar icon="fas fa-chart-bar" title="Rating Ranges"/>
                        <StarFilter/>
                        <TitleBar icon="fas fa-hand-holding-usd" title="Price Ranges"/>
                        <List data={discounts}/>
                    </div>
                    <div className="col-md-9">
                        <TitleBar icon="fas fa-book-open" title="Book Showcase"/>
                        <div className="filter-bar">
                            <div>
                                <i className="fas fa-th-large active"/>
                                <i className="fas fa-bars"/>
                                <p>All books are displayed with no filter applied</p>
                            </div>
                            <div onClick={fastDeliBook} className={filterFast ? "checked" : ""}>
                                <i className={filterFast? "fas fa-check-square" : "fas fa-square"}/>
                                <p>Only Fast Delivery</p>
                            </div>
                        </div>
                        <div className="book-list">
                            <div className="row">
                                {
                                    storeBooks.map((v, i) => (
                                        <div className="col-md-4" key={i}>
                                            <Book {...v}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <ul className="store-pagination">
            				<li className="active">1</li>
            				<li>2</li>
            				<li>3</li>
            				<li>4</li>
            				<li>5</li>
            			</ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Store;
