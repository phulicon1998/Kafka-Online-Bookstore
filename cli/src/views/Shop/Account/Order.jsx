import React, {useState, useEffect, useCallback} from "react";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import {connect} from "react-redux";
import statusToString from "constants/statusTypes";

const OrderRow = ({_id, createdDate, money, status}) => (
    <div className="orders-row">
        <div className="row">
            <div className="col-md-2">
                <a href={`/account/orders/${_id}`}>#KB{_id.substring(0, 5)}</a>
            </div>
            <div className="col-md-4">
                <p>Book name...and 1 other product(s)</p>
            </div>
            <div className="col-md-2">
                <p>{createdDate}</p>
            </div>
            <div className="col-md-2">
                <p>$ {money}</p>
            </div>
            <div className="col-md-2">
                {statusToString(status)}
            </div>
        </div>
    </div>
)

function Order({user}) {
    const [orders, setOrders] = useState([]);

    const load = useCallback(async() => {
        let orderData = await apiCall(...api.order.get(user._id));
        setOrders(orderData);
    }, [user._id]);

    useEffect(() => {
        load();
    }, [load])

    return (
        <div>
            <div className="orders-section">
                <h4><i className="fas fa-clipboard-list"/> Manage Orders</h4>
                <div>
                    <p>
                        <span><i className="fas fa-filter"/> all</span> - <span>completed</span> - <span>working</span> - <span>cancelled</span>
                    </p>
                </div>
            </div>
            <div className="orders-header">
                <div className="row">
                    <div className="col-md-2">
                        <p>Order serial</p>
                    </div>
                    <div className="col-md-4">
                        <p>Books</p>
                    </div>
                    <div className="col-md-2">
                        <p>Date created</p>
                    </div>
                    <div className="col-md-2">
                        <p>Total price</p>
                    </div>
                    <div className="col-md-2">
                        <p>Status</p>
                    </div>
                </div>
            </div>
            <div style={{"marginBottom": "20px"}}>
                {
                    orders.map((v, i) => (
                        <OrderRow {...v} key={i}/>
                    ))
                }
            </div>
        </div>
    )
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(Order);
