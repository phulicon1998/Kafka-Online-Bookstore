import React, {useState, useEffect, useCallback} from "react";
import {connect} from "react-redux";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import {sendEmptyCart} from "appRedux/actions/cart";

// comps
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import TitleBar from "components/Shop/Bar/TitleBar";
import CartBook from "containers/Product/CartBook";
import PricePanel from "components/Shop/Panel/PricePanel";
import SubmitCart from "./SubmitCart";

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

const CartList = ({empty, carts}) => (
    <div>
        <TitleBar title="Your cart" icon="fas fa-list-ul"/>
        {
            !empty
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
)

const DEFAULT_ORDER = {
    money: 0,
    fastDelivery: false,
    receiver: "",
	address: "",
	city: "",
	country: "",
	phone: "",
}

function Cart({cart, sendEmptyCart, user, ...props}) {
    const [carts, setCarts] = useState([]);
    const [subMoney, setSubMoney] = useState({
        shipping: 10,
        cover: 0
    })
    const [order, setOrder] = useState(DEFAULT_ORDER);
    const [submitStep, toSubmitStep] = useState(false);

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
                e.cover = false;
            })
        }
        setCarts(cartData);

    }, [cart, sendEmptyCart]);

    useEffect(() => {
        load();
    }, [cart, load])

    const calcTotalPrice = useCallback(() => {
        let {cover, shipping} = subMoney;
        let price = carts.reduce((acc, next) => acc + eachPrice(next), 0);
        setOrder(prev => ({...prev, money: price + cover + shipping}));
    }, [carts, subMoney]);

    useEffect(() => {
        calcTotalPrice();
    }, [calcTotalPrice])

    function eachPrice({price, quantity, discount}) {
        return price * quantity * (100 - discount) / 100;
    }

    function hdChangeCover(cartItem_id) {
        let newCarts = carts.map(v => {
            if(v._id === cartItem_id) {
                return {
                    ...v,
                    cover: !v.cover
                }
            }
            return v;
        })
        setCarts(newCarts);

        // Calculate the price of cover after select using cover
        let coverPrice = newCarts.filter(v => v.cover).reduce((a, n) => {
            return a += n.quantity * 2;
        }, 0);
        setSubMoney(prev => ({...prev, cover: coverPrice}));
    }

    function hdChangeDelivery(fastDelivery, shipping) {
        setSubMoney(prev =>({...prev, shipping}));
        setOrder(prev => ({...prev, fastDelivery}));
    }

    async function submitOrder() {
        try {
            // Remove the shipment_id (used for identifying selected address)
            const submitOrder = {...order};
            delete submitOrder.shipment_id;

            // Get list of OrderItem
            let orderEditions = carts.map(v => {
                const {discount, price, quantity, cover} = v;
                return {
                    discount, price, quantity, cover,
                    edition_id: v._id,
                }
            })

            let createdOrder = await apiCall(...api.order.create(user._id), {order: submitOrder, orderEditions});
            sendEmptyCart();
            return props.history.push(`/account/orders/${createdOrder._id}`);
        } catch (e) {
            console.log("There are some errors.");
        }
    }

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
                        { submitStep || <CartList empty={cartIsEmpty} carts={carts}/> }
                        {
                            submitStep && <SubmitCart
                                carts={carts}
                                user={user}
                                order={order}
                                setOrder={setOrder}
                                changeCover={hdChangeCover}
                                changeDelivery={hdChangeDelivery}
                            />
                        }
                    </div>
                    {
                        cartIsEmpty || <div className="col-md-4">
                            <TitleBar title="Order detail" icon="fas fa-list-ul"/>
                            <PricePanel
                                {...subMoney}
                                total={order.money}
                            />
                            {
                                submitStep || <div className="cart-button">
                                    <button onClick={() => toSubmitStep(prev => !prev)}><i className="fas fa-shopping-cart"/> Create order</button>
                                    <button onClick={sendEmptyCart}>Remove</button>
                                </div>
                            }
                            {
                                submitStep && <div className="submit-cart-button">
                                    <button onClick={submitOrder}>
                                        <i className="fas fa-file"/> Submit Order
                                    </button>
                                    <button onClick={() => toSubmitStep(prev => !prev)}>
                                        Back to cart
                                    </button>
                                </div>
                            }
                        </div>
                    }
                    {
                        submitStep|| <div className="col-md-12">
                            <TitleBar title="Wishlist" icon="fas fa-list-ul"/>
                            <EmptyWish msg="You don't have any favourite books yet"/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

function mapState({cart, user}) {
    return {cart, user: user.data}
}

export default connect(mapState, {sendEmptyCart})(Cart);
