import React, {useState, useEffect, useCallback} from "react";
import {apiCall} from "constants/apiCall";
import api from "constants/api";

import Breadcrumb from "components/Shop/Bar/Breadcrumb";

function OrderDetail({...props}) {
    const [order, setOrder] = useState({});

    const load = useCallback(async() => {
        const {order_id} = props.match.params;
        let orderData = await apiCall(...api.order.getOne(order_id));
        setOrder(orderData);
    }, [props.match.params]);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <div>
            <Breadcrumb
                paths={[
                    {path: "/", name: "Home"}
                ]}
                current="Order"
            />
            <div className="container">
                <h1>Order #{order._id}</h1>
                <h3>Money: {order.money}</h3>
                <h3>Fast delivery: {`${order.fastDelivery}`}</h3>
            </div>
        </div>
    )
}

export default OrderDetail;
