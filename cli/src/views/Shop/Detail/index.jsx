import React, {useState, useEffect, useCallback} from "react";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import Loader from "components/Shop/Load/Loader";
import Breadcrumb from "components/Shop/Bar/Breadcrumb";

function Detail({match, ...props}) {
    const [loading, setLoading] = useState(true);
    const [edition, setEdition] = useState({
        "_id": "",
        "book_id": {
            bookcare: false,
            name: "...",
            image: {
                url: ""
            }
        },
        price: 0,
        discount: 0,
        genres: [],
        authors: [],
        images: []
    })

    const load = useCallback(async() => {
        const {edition_id} = match.params;
        let editionData = await apiCall(...api.edition.getOne(edition_id));
        setEdition(editionData);
        setLoading(false);
    }, [match.params]);

    useEffect(() => {
        load();
    }, [load])

    return (
        <div>
            <Breadcrumb
                paths={[
                    {path: "/", name: "Home"},
                    {path: "/store", name: "Store"}
                ]}
                current={edition.book_id.name}
                viewed
            />
            <div className="container">
                <div className="row" style={{"marginTop": "40px"}}>
                    <div className="col-md-9">
                        <Loader loading={loading}>
                            <div className="store-detail">
                                <div className="row">
                                    <div className="col-md-5">
                                        <img src={edition.book_id.image.url} alt="" className="img-responsive"/>
                                        <div>
                                            {
                                                edition.images.map((v, i) => (
                                                    <img key={i} alt="" src={v.url} className={`img-responsive ${i === 0 ? "active" : ""}`}/>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <p>{edition.genres.map(v => v.name).toString()}</p>
                                        <h2>{edition.book_id.name}</h2>
                                        <p>The <b>15th</b> place in top of <i>world's best seller book this month</i></p>
                                        <p>
                                            <b>Availibility:</b>
                                            <b> {edition.amount > 5 ? "In stock" : `Only ${edition.amount} left`}</b>
                                        </p>
                                        <p>${(edition.price * (100 - edition.discount) / 100).toFixed(2)} <del>${edition.price.toFixed(2)}</del></p>
                                        <hr/>
                                        <p><b>Author:</b> {edition.authors.map(v => v.name).toString()}</p>
                                        <p><b>Bookcare:</b> {edition.book_id.bookcare.toString()}</p>
                                        <hr/>
                                        <p><b>Quantity & Order</b></p>
                                        <div>
                                            <div>
                                                <button>+</button>
                                                <input type="text" value={1}/>
                                                <button>-</button>
                                            </div>
                                            <button>Add to cart</button>
                                        </div>
                                        <div>
                                            <p><a href="/"><i className="fas fa-heart"/> Add to Wishlist</a></p>
                                            <p><a href="/"><i className="fas fa-clock"/> Buy Used books</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Loader>
                    </div>
                    <div className="col-md-3">
                        <h3>This is designed later</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;
