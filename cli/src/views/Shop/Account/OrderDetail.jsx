import React, {useState, useEffect, useCallback} from "react";
import {apiCall} from "constants/apiCall";
import api from "constants/api";
import statusToString from "constants/statusTypes";
import Loader from "components/Shop/Load/Loader";

const BookInOrder = ({cover, edition_id, price, discount, quantity}) => (
    <div className="row">
        <div className="col-md-8">
            <div>
                <div>
                    <img src={edition_id.book_id.image.url} alt=""/>
                    { cover && <p>covered!</p> }
                </div>
                <div>
                    <p><span>{edition_id.book_id.name}</span></p>
                    <p>{edition_id.book_id.authors.map(v => v.name).toString()}</p>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="price">
                <p>$ {(price * quantity * (100 - discount) / 100).toFixed(2)} <span>$ {(price*quantity).toFixed(2)}</span> <span>-{discount}%</span></p>
                <p>Unit price - $ {price} <i className="fab fa-product-hunt"/></p>
            </div>
        </div>
    </div>
)

function OrderDetail({...props}) {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({
        _id: "",
        status: 0,
        items: []
    });

    const load = useCallback(async() => {
        const {order_id} = props.match.params;
        let orderData = await apiCall(...api.order.getOne(order_id));
        setOrder(orderData);
        setLoading(false);
    }, [props.match.params]);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <Loader loading={loading}>
            <div className="order-detail-section">
                <h4><i className="fas fa-file"></i> Order <span>#KB{order._id ? order._id.substring(0, 5) : ""}</span></h4>
                <p>Status: <b>{statusToString(order.status ? order.status : 0)}</b></p>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="order-detail-header">
                        <div className="row">
                            <div className="col-md-8">
                                <p><i className="fas fa-caret-down"></i> Books</p>
                            </div>
                            <div className="col-md-4">
                                <p>Price</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-detail-row">
                        {
                            order.items.map((v, i) => (
                                <BookInOrder {...v} key={i}/>
                            ))
                        }
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="order-detail-info">
                        <div>
                            <h5><i className="fas fa-caret-down"/> Receiver address</h5>
                            <p><i className="fas fa-user"/> {order.receiver}</p>
                            <p>Address: {order.address}, {order.city}, {order.country}</p>
                            <p>Phone: {order.phone}</p>
                        </div>
                        <div className="deliveryPayment">
                            <h5><i className="fas fa-caret-down"></i> Delivery & payment</h5>
                            <p>Checkout method: {order.cashOnDelivery ? "COD" : "Online Payment"}</p>
                            <p>Checkout status: {order.isCheckedOut ? "Already paid" : "Not yet"}</p>
                            {
                                order.fastDelivery
                                ? <p>Delivery: Fast delivery ($20)</p>
                                : <p>Delivery: Normal delivery ($15)</p>
                            }
                        </div>
                        <button>View the bill</button>
                    </div>
				</div>
            </div>
        </Loader>
    )
}

export default OrderDetail;
