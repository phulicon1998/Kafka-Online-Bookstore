import React, {useState, useEffect, useCallback} from "react";
import {Card, Spin, Table, Divider} from "antd";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import statusToString from "constants/statusTypes";
import moment from "moment";
import {state} from "constants/statusTypes";

function ManageOrder({notify, ...props}) {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const load = useCallback(async() => {
        try {
            let orderData = await apiCall(...api.order.get());
            setOrders(orderData);
            setLoading(false);
        } catch (e) {
            notify("error", "Data is not loaded");
        }
    }, [notify]);

    useEffect(() => {
        load();
    }, [load])

    async function hdStatus(order_id, status) {
        setLoading(true);
        try {
            let editedOrder = await apiCall(...api.order.edit(order_id), {status});
            let newOrders = orders.map(o => {
                if(o._id === editedOrder._id) {
                    return {
                        ...o,
                        status: editedOrder.status
                    }
                }
                return {...o};
            })
            setOrders(newOrders);
        } catch (e) {
            console.log(e);
            notify("error", "Data is not updated");
        }
        setLoading(false);
    }

    const Action = ({state, id, code}) => (
        <span
            className="gx-link"
            onClick={hdStatus.bind(this, id, code)}
        >{state}</span>
    )

    return (
        <Card title="Selection Table">
            <Spin spinning={loading}>
                <Table
                    className="gx-table-responsive"
                    dataSource={orders}
                    rowKey="_id"
                    columns={[
                        {
                            title: "Order Code",
                            dataIndex: '_id',
                            render: text => <span>#KB{text.substring(0, 5).toUpperCase()}</span>
                        },
                        {
                            title: "Order Total Money",
                            dataIndex: 'money',
                            render: text => <span>$ {text.toFixed(2)}</span>
                        },
                        {
                            title: "Delivery Method",
                            dataIndex: "fastDelivery",
                            render: text => <span>{text ? "Fast" : "Standard"}</span>
                        },
                        {
                            title: "Order Status",
                            dataIndex: "status",
                            render: text => <span>{statusToString(text)}</span>
                        },
                        {
                            title: "Order Receiver",
                            dataIndex: "receiver"
                        },
                        {
                            title: "Shipment Information",
                            render: (text, rec) => <span>{`${rec.address}, ${rec.city}, ${rec.country}`}</span>
                        },
                        {
                            title: "Created At",
                            dataIndex: "createdAt",
                            render: text => <span>{moment(text).format("DD-MM-YYYY, h:mm:ss a")}</span>
                        },
                        {
                            title: "Updated At",
                            dataIndex: "updatedAt",
                            render: text => <span>{moment(text).format("DD-MM-YYYY, h:mm:ss a")}</span>
                        },
                        {
                            title: "Actions",
                            render: (text, rec) => (
                                <span>
                                    <Action
                                        id={rec._id}
                                        state="Working"
                                        code={state.WORKING}
                                    />
                                    <Divider type="vertical"/>
                                    <Action
                                        id={rec._id}
                                        state="Transporting"
                                        code={state.TRANSPORTING}
                                    />
                                    <Divider type="vertical"/>
                                    <Action
                                        id={rec._id}
                                        state="Completed"
                                        code={state.COMPLETED}
                                    />
                                    <Divider type="vertical"/>
                                    <Action
                                        id={rec._id}
                                        state="Cancelled"
                                        code={state.CANCELLED}
                                    />
                                </span>
                            )
                        }
                    ]}
                />
            </Spin>
        </Card>
    )
}

export default withNoti(ManageOrder);
