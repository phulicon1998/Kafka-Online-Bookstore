import React from "react";
import {connect} from "react-redux";
import {sendChangeCart, sendRemoveCart} from "appRedux/actions/cart";

const CartBook = ({_id, img, name, author, fastDelivery, price, discount, quantity, user, sendChangeCart, sendRemoveCart}) => {

    function changeAmount(q) {
        if(quantity === 1 && q < 0) {
            return console.log("You have reached the minimum number of item in cart.");
        }
        sendChangeCart(_id, q);
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <img src={img} alt="img"/>
                <div>
                    <h4>{name}</h4>
                    <p>{author}</p>
                    <span className={fastDelivery ? "fast" : "standard"}><i className={fastDelivery ? "fas fa-rocket" : "fas fa-truck"}/>{fastDelivery ? "Fast Delivery" : "Standard"}</span>
                    <div>
                        <button>Wishlist</button>
                        <button onClick={sendRemoveCart.bind(this, _id)}>Remove</button>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <h4>${(price*quantity*(100 - discount) / 100).toFixed(2)}</h4>
                <p>${price.toFixed(2)}</p>
                <p>-{discount}%</p>
            </div>
            <div className="col-md-3">
                <div>
                    <button
                        className="btn btn-default"
                        onClick={changeAmount.bind(this, -1)}
                    >
                        <i className="fas fa-minus"/>
                    </button>
                    <p>{quantity}</p>
                    <button
                        className="btn btn-default"
                        onClick={changeAmount.bind(this, 1)}
                    >
                        <i className="fas fa-plus"/>
                    </button>
                </div>
            </div>
        </div>
    )
}


function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, {sendChangeCart, sendRemoveCart})(CartBook);
