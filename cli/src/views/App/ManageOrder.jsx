import React, {useState, useEffect, useCallback} from "react";
import {Card, Spin, Table, Divider} from "antd";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import statusToString from "constants/statusTypes";
import moment from "moment";
import {state} from "constants/statusTypes";
import {connect} from "react-redux";
import * as permissions from "constants/credentialControl";

function Action({state, onClick, ableToReset, isUpperState, isCurrent}) {
  return isUpperState ? null : (
    <span className="gx-link" onClick={onClick}>
            {state} <Divider type="vertical"/>
        </span>
  )
}

function ManageOrder({notify, role, ...props}) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const load = useCallback(async () => {
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
        if (o._id === editedOrder._id) {
          return {
            ...o,
            status: editedOrder.status,
            isCheckedOut: editedOrder.isCheckedOut
          }
        }
        return {...o};
      })
      setOrders(newOrders);
    } catch (e) {
      notify("error", "Data is not updated");
    }
    setLoading(false);
  }

  function renderActions(text, rec) {
    return rec.status <= state.TRANSPORTING ? (
      <>
        <Action
          state="Working"
          onClick={hdStatus.bind(this, rec._id, state.WORKING)}
          isUpperState={rec.status >= state.WORKING}
        />
        <Action
          state="Transporting"
          onClick={hdStatus.bind(this, rec._id, state.TRANSPORTING)}
          isUpperState={rec.status >= state.TRANSPORTING}
        />
        <Action
          state="Completed"
          isUpperState={rec.status >= state.COMPLETED}
          onClick={hdStatus.bind(this, rec._id, state.COMPLETED)}
        />
        <Action
          state="Cancelled"
          isUpperState={rec.status >= state.CANCELLED}
          onClick={hdStatus.bind(this, rec._id, state.CANCELLED)}
        />
    </>
    ) : <span>None</span>;
  }

  return (
    <Card title="List of Orders">
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
              render: (text, rec) => <span className="order-table-payment">
                                {rec.cashOnDelivery ||
                                  <i className="fas fa-credit-card"/>} $ {text.toFixed(2)} {rec.isCheckedOut &&
                <i className="fas fa-check"/>}
                            </span>
            },
            {
              title: "Order Status",
              dataIndex: "status",
              render: text => <span className={`order-table-${statusToString(text)}`}>{statusToString(text)}</span>
            },
            {
              title: "Shipment Information",
              render: (text, rec) => <span className="order-table-shipment">
                                <span>{rec.receiver} {rec.fastDelivery && <i className="fas fa-rocket"/>}</span>
                                <span>{`${rec.address}, ${rec.city}, ${rec.country}`}</span>
                            </span>
            },
            {
              title: "Created At",
              dataIndex: "createdAt",
              render: text => <span className="order-table-time">{moment(text).format("DD-MM-YYYY, h:mm:ss a")}</span>
            },
            {
              title: "Updated At",
              dataIndex: "updatedAt",
              render: text => <span className="order-table-time">{moment(text).format("DD-MM-YYYY, h:mm:ss a")}</span>
            },
            {
              title: "Actions",
              render: renderActions
            }
          ]}
        />
      </Spin>
    </Card>
  )
}

function mapState({user}) {
  const {isPermit} = permissions;
  return {
    role: {
      isManager: isPermit(user.data.role)(permissions.MANAGER_PERMISSION)
    }
  }
}

export default connect(mapState, null)(withNoti(ManageOrder));
