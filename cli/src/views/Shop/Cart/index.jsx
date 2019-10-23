import React, {useState, useEffect, useCallback} from "react";
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import TitleBar from "components/Shop/Bar/TitleBar";
import CartBook from "containers/Product/CartBook";
import PricePanel from "components/Shop/Panel/PricePanel";
import {connect} from "react-redux";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import {sendEmptyCart} from "appRedux/actions/cart";

const EmptyCart = ({back, msg}) => (
    <div className="empty-cart">
        <i className="fas fa-cart-arrow-down fa-6x"></i>
        <p>{msg}</p>
        {back && <a href="/store">Back to store</a>}
    </div>
);

const EmptyWish = ({back, msg}) => (
    <div className="empty-wish">
        <p>{msg}</p>
    </div>
);

function Cart({cart, sendEmptyCart}) {
    const [carts, setCarts] = useState([]);

    const load = useCallback(async() => {
        let cartData = await apiCall(...api.edition.getInCart(), cart);

        if(cartData.length === 0) {
            /* if there is no data retrieved by those edition id,
            that means it's fake/unavailable */
            sendEmptyCart();
        } else {
            // get the list id of cart (cart stored on client)
            let idList = cart.list.map(v => v.edition_id);
            cartData.forEach(e => {
                // get the quantity of book by its client storage's position - (using id to determine)
                const position = idList.indexOf(e._id);
                e.quantity = cart.list[position].quantity;
            })
        }
        
        setCarts(cartData);

    }, [cart, sendEmptyCart]);

    useEffect(() => {
        load();
    }, [cart, load])

    const cartIsEmpty = carts.length === 0;
    return (
        <div>
            <Breadcrumb
                paths={[
                    {path: "/", name: "Home"}
                ]}
                current="Cart"
            />
            <div className="container">
                <div className="row">
                    <div className={cartIsEmpty ? "col-md-12" : "col-md-8"}>
                        <TitleBar title="Your cart" icon="fas fa-list-ul"/>
                        {
                            !cartIsEmpty
                            ? (
                                <div className="cart-table">
                                    <div className="row">
                        				<div className="col-md-6">Books</div>
                        				<div className="col-md-3">Price</div>
                        				<div className="col-md-3">Amount</div>
                                    </div>
                                    <div className="list">
                                        {
                                            carts.map((v, i) => (
                                                <CartBook
                                                    {...v}
                                                    img={v.book_id.image.url}
                                                    name={v.book_id.name}
                                                    author={v.authors.map(v => v.name).toString()}
                                                    quantity={v.quantity}
                                                    key={i}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                            : <EmptyCart msg="You don't have any books inside cart yet" back/>
                        }
                    </div>
                    {cartIsEmpty || <div className="col-md-4">
                        <TitleBar title="Order detail" icon="fas fa-list-ul"/>
                        <PricePanel/>
                        <div className="cart-button">
                            <button><i className="fas fa-shopping-cart"/> Create order</button>
                            <button>Remove</button>
                        </div>
                    </div>}
                    <div className="col-md-12">
                        <TitleBar title="Wishlist" icon="fas fa-list-ul"/>
                        <EmptyWish msg="You don't have any favourite books yet"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapState({cart}) {
    return {cart}
}

export default connect(mapState, {sendEmptyCart})(Cart);
