import React from "react";
import TitleBar from "components/Shop/Bar/TitleBar";

const List = ({data}) => (
    <ul className="store-nav-genres">
        {
            data.map((v, i) => (
                <li key={i}><a href="/">{v.name}</a></li>
            ))
        }
    </ul>
)

const StarFilter = () => (
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

function Sidebar({genres, books}) {

    function getGenreAmount(g) {
        let booksByGenre = books.map(b => ({
            _id: b._id,
            genres: b.genres.map(ge => ge.name)
        }));
        return booksByGenre.filter(b => b.genres.indexOf(g.name) !== -1).length;
    }

    return (
        <div>
            <TitleBar icon="fas fa-chart-bar" title="Rating Ranges"/>
            <StarFilter/>
            <TitleBar icon="fas fa-list-ul" title="Book Category"/>
            <ul className="store-nav-genres">
                {
                    genres.map((g, i) => (
                        <li key={i}>
                            <a href="/">{g.name}</a><span>( {getGenreAmount(g)} )</span>
                        </li>
                    ))
                }
            </ul>
            <TitleBar icon="fas fa-hand-holding-usd" title="Price Ranges"/>
            <List data={[
                {
                    name: "Under $25",
                    inRange: p => p > 0 && p < 25
                },
                {
                    name: "From $25 to $50",
                    inRange: p => p > 25 && p < 50
                },
                {
                    name: "From $50 to $80",
                    inRange: p => p > 50 && p < 80
                },
                {
                    name: "From $80 to Above",
                    inRange: p => p > 80
                }
            ]}/>
        </div>
    )
}

export default Sidebar;
