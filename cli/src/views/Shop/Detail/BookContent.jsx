import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import {qualityToString} from "constants/qualityControl";

function QualityBox({amount, qualityNum, book_id}) {
    let qualityName = qualityToString(qualityNum);
    return (
        <div className="quality-box">
            <h4>{qualityName}</h4>
            <p>{amount} item(s)</p>
            <button><Link to={`/store/quality/${book_id}/${qualityNum}`}>View</Link></button>
        </div>
    )
}

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
                {/* <hr/> */}
                <p>
                    <b>Availibility:</b>
                    <b> {edition.amount > 5 ? "In stock" : `Only ${edition.amount} left`}</b>
                </p>
                <p>${(edition.price * (100 - edition.discount) / 100).toFixed(2)} <del>${edition.price.toFixed(2)}</del></p>
                <hr/>
                {
                    edition.book_id.bookcare
                    ? <p><i className="fab fa-bandcamp"/> This product can be used <b>Bookcare</b></p>
                    : <p><i className="fab fa-bandcamp"/> There is no bookcare available for this product</p>
                }
                {
                    edition.fastDelivery
                    ? <p> Delivery time estimated may be at <b>Tommorrow</b>, on <b>{moment().add(1, "days").format("DD/MM/YYYY")}</b></p>
                    : <p><i className="fas fa-truck"/> Estimated delivery time may be between <b>{moment().add(2, "days").format("dddd (Do)")}</b> and <b>{moment().add(5, "days").format("dddd (Do)")}</b></p>
                }
                <hr/>
                <p><b>Description</b></p>

                <hr/>
                <p><b>Quantity & Order</b></p>
                <div>
                    <div>
                        <button>+</button>
                        <input type="text" value={quantity} onChange={onChange}/>
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
