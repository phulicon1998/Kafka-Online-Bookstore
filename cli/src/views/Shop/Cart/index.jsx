import React, {useState, useEffect, useCallback} from "react";
import {connect} from "react-redux";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import {sendEmptyCart, sendRemoveCart, sendChangeCart} from "appRedux/actions/cart";
import StripeCheckout from "react-stripe-checkout";

// comps
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import TitleBar from "components/Shop/Bar/TitleBar";
import PricePanel from "components/Shop/Panel/PricePanel";
import Message from "components/Shop/Message";

// views
import CartList from "./CartList";
import SubmitCart from "./SubmitCart";

const EmptyWish = ({back, msg}) => (
    <div className="empty-wish">
        <p>{msg}</p>
    </div>
);

const DEFAULT_ORDER = {
    money: 0,
    fastDelivery: false,
    receiver: "",
	address: "",
	city: "",
	country: "",
	phone: "",
}

const STEPS = {
    LIST: 1,
    SUBMIT: 2
}

function Cart({cart, sendEmptyCart, sendRemoveCart, sendChangeCart, user, message, ...props}) {
    const [carts, setCarts] = useState([]);
    const [subMoney, setSubMoney] = useState({
        shipping: 10,
        cover: 0
    })
    const [order, setOrder] = useState(DEFAULT_ORDER);
    const [step, toStep] = useState(STEPS.LIST);

    const load = useCallback(async() => {
        let cartData = await apiCall(...api.edition.getInCart(), cart);
        let verififedCartData = [];
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

            // Check and remove if any edition in cart is no more available
            for(var edition of cartData) {
                let rs = await apiCall(...api.edition.compare(edition._id), {
                    amount: edition.quantity
                });

                if(!rs.available) {
                    // if storedAmount is 0, it means the edition is out of business or sold out
                    if(rs.storedAmount > 0) {
                        sendChangeCart(edition._id, -(edition.quantity - rs.storedAmount))
                    } else {
                        sendRemoveCart(edition._id);
                    }
                } else {
                    verififedCartData.push(edition);
                }
            }
        }
        setCarts(verififedCartData);

    }, [cart, sendChangeCart, sendEmptyCart, sendRemoveCart]);

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
    }, [calcTotalPrice]);

    function eachPrice({price, quantity, discount}) {
        return price * quantity * (100 - discount) / 100;
    }

    function getBackToken(token) {
        submitOrder(token.id);
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

    async function submitOrder(stripeToken = false) {
        try {
            // Remove the shipment_id (used for identifying selected address)
            let submitOrder = {...order};
            delete submitOrder.shipment_id;

            // Check if the order method is online payment
            if(stripeToken) {
                // if the payment method is applied
                submitOrder = {...submitOrder, cashOnDelivery: false};
            }

            // Get list of OrderItem
            let orderEditions = carts.map(v => {
                const {discount, price, quantity, cover} = v;
                return {
                    discount, price, quantity, cover,
                    edition_id: v._id,
                }
            })

            let createdOrder = await apiCall(...api.order.create(user._id), {order: submitOrder, orderEditions, stripeToken});
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
                {
                    message.content.length > 0 && <div className="row">
                        <div className="col-md-12"><Message {...message}/></div>
                    </div>
                }
                <div className="row">
                    <div className={cartIsEmpty ? "col-md-12" : "col-md-8"}>
                        {
                            step === STEPS.LIST && <CartList empty={cartIsEmpty} carts={carts}/>
                        }
                        {
                            step === STEPS.SUBMIT && <SubmitCart
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
                                step === STEPS.LIST && <div className="cart-button">
                                    <button onClick={() => toStep(STEPS.SUBMIT)}><i className="fas fa-shopping-cart"/> Create order</button>
                                    <button onClick={sendEmptyCart}>Remove</button>
                                </div>
                            }
                            {
                                step === STEPS.SUBMIT && <div className="submit-cart-button">
                                    <button onClick={submitOrder.bind(this, false)}>
                                        <i className="fas fa-file"/> Submit Order(COD)
                                    </button>
                                    <StripeCheckout
                                        name="Kafka Checkout"
                                        description="Fill those below to finish payment"
                                        amount={order.money*100}
                                        token={getBackToken}
                                        stripeKey={process.env.REACT_APP_STRIPE_KEY}
                                    >
                                        <button className="checkout">Submit & Checkout Order</button>
                                    </StripeCheckout>
                                    <button onClick={() => toStep(STEPS.LIST)}>
                                        Back to cart
                                    </button>
                                </div>
                            }
                        </div>
                    }
                    {
                        step === STEPS.LIST && <div className="col-md-12">
                            <TitleBar title="Wishlist" icon="fas fa-list-ul"/>
                            <EmptyWish msg="You don't have any favourite books yet"/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

function mapState({cart, user, message}) {
    return {
        cart, message,
        user: user.data
    }
}

export default connect(mapState, {sendEmptyCart, sendRemoveCart, sendChangeCart})(Cart);
