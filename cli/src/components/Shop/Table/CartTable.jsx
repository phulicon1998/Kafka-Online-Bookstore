import React from "react";

const CartRow = ({img, name, author, delivery, price, discount, quantity}) => (
    <div className="row">
        <div className="col-md-6">
            <img src={img} alt="img"/>
            <div>
                <h4>{name}</h4>
                <p>{author}</p>
                <span className={delivery ? "fast" : "standard"}><i className={delivery ? "fas fa-rocket" : "fas fa-truck"}/>{delivery ? "Fast Delivery" : "Standard"}</span>
                <div>
                    <button>Wishlist</button>
                    <button>Remove</button>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <h4>${(price*(100 - discount) / 100).toFixed(2)}</h4>
			<p>${price.toFixed(2)}</p>
			<p>-{discount}%</p>
        </div>
        <div className="col-md-3">
            <div>
                <button className="btn btn-default"><i className="fas fa-minus"/></button>
                <p>0</p>
                <button className="btn btn-default"><i className="fas fa-plus"/></button>
            </div>
        </div>
    </div>
)

function CartTable({carts}) {
    return (
        <div className="cart-table">
            <div className="row">
				<div className="col-md-6">Books</div>
				<div className="col-md-3">Price</div>
				<div className="col-md-3">Amount</div>
            </div>
            <div className="list">
                {
                    carts.map((v, i) => (
                        <CartRow {...v} key={i}/>
                    ))
                }
            </div>
        </div>
    )
}

export default CartTable;
