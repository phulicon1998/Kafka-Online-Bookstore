import React from "react";
import Book from "containers/Product/Book";
import landingBg from "assets/imgs/landing.jpg";
import recommendBg from "assets/imgs/rec.jpg"
import {benefits, genres, recommend, books} from "./data";

const Benefit = ({icon, name, subname}) => (
    <div className="col-md-4">
        <i className={icon}/>
        <div>
            <h3>{name}</h3>
            <p>{subname}</p>
        </div>
    </div>
)

const Genre = ({bg, col}) => (
    <div
        className={`col-md-${col}`}
        style={{"backgroundImage": `url(${bg})`}}
    >
        <h3>Thriller</h3>
    </div>
)

function Landing() {
    return (
        <div>
            <div className="landing-header" style={{"backgroundImage": `url(${landingBg})`}}>
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
                        {genres.map((v, i) => (<Genre {...v} key={i}/>))}
                    </div>
                </div>
            </div>
            <div className="recommend-book" style={{"backgroundImage": `url(${recommendBg})`}}>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <h4>Recommended Book</h4>
                                <h1>{recommend.name}</h1>
                                <h4>{recommend.author}</h4>
                                <p>{recommend.desc}</p>
                                <button>Get one now</button>
                            </div>
                            <div className="col-md-4">
                                <img src={recommend.front} alt=""/>
                            </div>
                            <div className="col-md-4">
                                <img src={recommend.back} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="feature-books">
                <div className="container">
                    <h2>Featured books</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </p>
                    <div className="row">
                        {
                            books.map((v, i) => (
                                <div className="col-md-3" key={i}>
                                    <Book {...v}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
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
