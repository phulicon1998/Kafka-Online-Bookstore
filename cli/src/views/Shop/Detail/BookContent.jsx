import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import {qualityToString} from "constants/qualityControl";

function QualityBox({amount, qualityNum, book_id}) {
    let qualityName = qualityToString(qualityNum);
    return (
        <Link to={`/store/quality/${book_id}/${qualityNum}`} className="quality-box">
            <h4>{qualityName}</h4>
            <p>{amount} item(s) from $10</p>
        </Link>
    )
}

function BookContent({edition, quantity, onChange, qualities}) {
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
                <p><b>Authors: </b>{edition.authors.map(v => v.name).toString()}</p>
                <p>
                    <b>Availibility:</b>
                    <b> {edition.amount > 5 ? "In stock" : `Only ${edition.amount} left`}</b>
                </p>
                <p>${(edition.price * (100 - edition.discount) / 100).toFixed(2)} <del>${edition.price.toFixed(2)}</del></p>
                <hr/>
                <p><b>Other Qualities</b></p>
                <div>
                    {
                        qualities.map((q, i) => (
                            <QualityBox {...q} book_id={edition.book_id._id} key={i}/>
                        ))
                    }
                </div>
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
                <hr/>
                {
                    edition.book_id.bookcare
                    ? <p className="bookcare"><i className="fab fa-bandcamp"/> This product can be used <b>Bookcare</b></p>
                    : <p className="bookcare"><i className="fab fa-bandcamp"/> There is no bookcare available for this product</p>
                }
                {
                    edition.fastDelivery
                    ? <p className="delivery-time"> Delivery time estimated may be at <b>Tommorrow</b>, on <b>{moment().add(1, "days").format("DD/MM/YYYY")}</b></p>
                    : <p className="delivery-time"><i className="fas fa-truck"/> Estimated delivery time - <b>{moment().add(2, "days").format("ddd, Do")}</b> to <b>{moment().add(5, "days").format("ddd, Do")}</b></p>
                }
            </div>
        </div>
    )
}

export default BookContent;
