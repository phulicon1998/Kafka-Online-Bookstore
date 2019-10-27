import React from "react";
import {connect} from "react-redux";
import {sendAddCart} from "appRedux/actions/cart";

const Book = ({editionId, img, name, author, price, discount, sendAddCart}) => (
    <div className="book">
        <div>
            <img src={img} className="img-responsive" alt="img"/>
            <div>
                <p><i className="fas fa-star"/> 4.5/5</p>
                <button onClick={() => sendAddCart(editionId)}>
                    <i className="fas fa-shopping-cart"/>
                </button>
                <button>
                    <i className="far fa-heart"/>
                </button>
            </div>
        </div>
        <a href={`/store/${editionId}`}>{name}</a>
        <p>{author}</p>
        <p>${(price*(100-discount)/100).toFixed(2)} <span>{price.toFixed(2)}</span> <span>-{discount}%</span></p>
    </div>
);

export default connect(null, {sendAddCart})(Book);
