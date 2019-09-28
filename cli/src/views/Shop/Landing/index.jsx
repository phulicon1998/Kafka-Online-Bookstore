import React from "react";
import Navbar from "components/Shop/Navbar/Navbar";

import landingImg from "assets/imgs/landing.jpg";
import {benefits} from "./data";

const Benefit = ({icon, name, subname}) => (
    <div className="col-md-4">
        <i className={icon}/>
        <div>
            <h3>{name}</h3>
            <p>{subname}</p>
        </div>
    </div>
)

function Landing() {
    return (
        <div>
            <div className="landing-header" style={{"backgroundImage": `url(${landingImg})`}}>
                <Navbar transparent/>
                <div className="container">
                    <h2>Welcome to Kafka,</h2>
                    <p>New, cheap books with quality service.</p>
                    <p>Kafka proud to be one of the best service in bringing knowledge closer to people's life.</p>
                </div>
            </div>
            <div className="benefit-bar">
                <div className="container">
                    <div className="row">
                        { benefits.map((v, i) => <Benefit {...v} key={i}/>) }
                    </div>
                </div>
            </div>
            <div className="trending-genres">
                <div className="container">
                    <div>
                        <h2>Trending Genres</h2>
                        <span><i className="fas fa-star"/>This Week</span>
                    </div>
                    <div>
                        <div className="col-md-5" style={{"backgroundImage": `url(${landingImg})`}}>
                            <h3>Thriller</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="recommend-book">
                {/* content here */}
            </div>
            <div className="feature-books">
                {/* content here */}
            </div>
            <div className="subcribe-email">
                {/* content here */}
            </div>
            <div className="popular-authors">
                {/* content here */}
            </div>
            <div className="upcoming-events">
                {/* content here */}
            </div>
            <div className="daily-deals">
                {/* content here */}
            </div>
            <div className="recent-blogs">
                {/* content here */}
            </div>
        </div>
    )
}

export default Landing;
