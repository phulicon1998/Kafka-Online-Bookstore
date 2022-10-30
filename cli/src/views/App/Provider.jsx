import React, {useState, useEffect} from "react";
import {Card, Table} from "antd";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import PopConfirm from "components/Shop/Pop/PopConfirm";
import withNoti from "hocs/App/withNoti";

function Provider({notify, ...props}) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    load();
  }, [])

  async function load() {
    let providerData = await apiCall(...api.provider.get());
    setProviders(providerData);
  }

  async function remove(provider_id) {
    try {
      await apiCall(...api.provider.remove(provider_id));
      let newProviders = providers.filter(v => v._id !== provider_id);
      setProviders(newProviders);
      return notify("success", "Process is completed", "Provider is removed successfully.");
    } catch (err) {
      return notify("error", "Data is not removed");
    }
  }

  return (
    <Card title="Selection Table">
      <Table
        className="gx-table-responsive"
        dataSource={providers}
        rowKey="_id"
        columns={[
          {
            title: "Provider Name",
            dataIndex: 'name'
          },
          {
            title: 'Provider Phone',
            dataIndex: 'phone'
          },
          {
            title: 'Provider User',
            dataIndex: 'user_id',
            render: (text) => <span>{text.username}</span>
          },
          {
            title: 'Provider Email',
            dataIndex: 'email'
          },
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                                <PopConfirm
                                  title="Are you sure to delete this provider?"
                                  task={remove.bind(this, record._id)}
                                  okText="Sure, remove it"
                                  cancelText="Not now"
                                >
                                    <span className="gx-link">Delete</span>
                                </PopConfirm>
                            </span>
            )
          }
        ]}
      />
    </Card>
  )
}

export default withNoti(Provider);
