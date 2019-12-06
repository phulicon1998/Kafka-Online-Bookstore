import React from "react";
import TitleBar from "components/Shop/Bar/TitleBar";

const genres = [
    "All",
	"Fantasy & Sci-Fi",
	"Art & Photography",
	"Cooking, Food & Wine",
	"Literature & Fiction",
	"Science & Education",
	"Business",
	"Childer's Book",
	"Biographies & Memoirs"
]

const discounts = [
    "Under $25",
    "$50 to $100",
    "$100 to $200",
    "$200 to Above"
]

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

function Sidebar() {
    return (
        <div>
            <TitleBar icon="fas fa-list-ul" title="Book Category"/>
            <List data={genres}/>
            <TitleBar icon="fas fa-chart-bar" title="Rating Ranges"/>
            <StarFilter/>
            <TitleBar icon="fas fa-hand-holding-usd" title="Price Ranges"/>
            <List data={discounts}/>
        </div>
    )
}

export default Sidebar;
