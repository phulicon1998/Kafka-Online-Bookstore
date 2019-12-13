import React, {useState, useEffect, useCallback} from "react";
import api from "constants/api";
import {apiCall} from "constants/apiCall";

import Sidebar from "components/Shop/Bar/Sidebar";
import TitleBar from "components/Shop/Bar/TitleBar";
import Book from "containers/Product/Book";

function StoreContent({books, title}) {
    const [genres, setGenres] = useState([]);
    const [filterFast, setFilterFast] = useState(false);

    const fastDeliBook = () => setFilterFast(prev => !prev);

    const load = useCallback(async() => {
        let genreData = await apiCall(...api.genre.get());
        setGenres(genreData);
    }, [])

    useEffect(() => {
        load();
    }, [load])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar
                        genres={genres}
                        books={books}
                    />
                </div>
                <div className="col-md-9">
                    <TitleBar icon="fas fa-book-open" title={title}/>
                    <div className="filter-bar">
                        <div>
                            <i className="fas fa-th-large active"/>
                            <i className="fas fa-bars"/>
                            <p>All books are displayed with no filter applied</p>
                        </div>
                        <div onClick={fastDeliBook} className={filterFast ? "checked" : ""}>
                            <i className={filterFast ? "fas fa-check-square" : "fas fa-square"}/>
                            <p>Only Fast Delivery</p>
                        </div>
                    </div>
                    <div className="book-list">
                        <div className="row">
                            {
                                books.map((v, i) => (
                                    <div className="col-md-4" key={i}>
                                        <Book
                                            img={v.image.url}
                                            name={v.name}
                                            author={v.authors.map(v => v.name).toString()}
                                            price={v.bestDeal.price}
                                            discount={v.bestDeal.discount}
                                            editionId={v.bestDeal._id}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {
                        books.length > 9 && <ul className="store-pagination">
                            <li className="active">1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}

export default StoreContent;
