import React from "react";
import moment from "moment";

function BookContent({edition, quantity, onChange}) {
    return (
        <div className="store-detail-v2">
            <div>
                <div>
                    {
                        edition.images.map((v, i) => (
                            <img key={i} alt="" src={v.url} className={`${i === 0 ? "active" : ""}`}/>
                        ))
                    }
                </div>
                <img src={edition.book_id.image.url} alt=""/>
            </div>
            <div>
                <p>{(edition.genres.map(v => v.name)).toString().split(",").join(", ")}</p>
                <h2>{edition.book_id.name}</h2>
                {/* <p>The <b>15th</b> place in top of <i>world's best seller book this month</i></p> */}
                <p><b>Authors: </b>{edition.authors.map(v => v.name).toString()}</p>
                <hr/>
                <p>
                    <b>Availibility:</b>
                    <b> {edition.amount > 5 ? "In stock" : `Only ${edition.amount} left`}</b>
                </p>
                <p>${(edition.price * (100 - edition.discount) / 100).toFixed(2)} <del>${edition.price.toFixed(2)}</del></p>
                <hr/>
                {/* <p><b>Authors: </b>{edition.genres.map(v => v.name).toString()}</p> */}
                {
                    edition.book_id.bookcare
                    ? <p><i className="fab fa-bandcamp"/> This product can be used <b>Bookcare</b></p>
                    : <p>There is no bookcare available for this product</p>
                }
                {
                    edition.fastDelivery
                    ? <p> Delivery time estimated may be at <b>Tommorrow</b>, on <b>{moment().add(1, "days").format("DD/MM/YYYY")}</b></p>
                    : <p> Estimated delivery time may be between <b>{moment().add(2, "days").format("DD/MM/YYYY")}</b> and <b>{moment().add(5, "days").format("DD/MM/YYYY")}</b></p>
                }
                {/* <p><b>Bookcare:</b> {edition.book_id.bookcare.toString()}</p> */}
                <hr/>
                <p><b>Quantity & Order</b></p>
                <div>
                    <div>
                        <button>+</button>
                        <input type="number" value={quantity} onChange={onChange}/>
                        <button>-</button>
                    </div>
                    <button>Add to cart</button>
                </div>
                <div>
                    <p><a href="/"><i className="fas fa-heart"/> Add to Wishlist</a></p>
                </div>
            </div>
        </div>
    )
}

export default BookContent;
