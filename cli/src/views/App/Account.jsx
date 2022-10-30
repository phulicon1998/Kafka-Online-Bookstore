import React, {useState, useEffect, useCallback} from "react";
import {Card, Table, Spin, Form, Input, Button, Select} from "antd";
import {SALESTAFF_PERMISSION, MANAGER_PERMISSION} from "constants/credentialControl";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall} from "constants/apiCall";

const {Option} = Select;
const FormItem = Form.Item;
const DEFAULT_ACCOUNT = {
  email: "",
  role: SALESTAFF_PERMISSION
}

function Account({notify, ...props}) {
  const [account, setAccount] = useState(DEFAULT_ACCOUNT);
  const [staffs, setStaffs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      let data = await apiCall(...api.user.get());
      setStaffs(data.sales);
      setCustomers(data.customers);
      setManagers(data.managers);
      setLoading(false);
    } catch (err) {
      return notify("error", "Data is not loaded");
    }
  }, [notify])

  useEffect(() => {
    load();
  }, [load]);

  function hdChange(e) {
    const {name, value} = e.target;
    setAccount(prev => ({...prev, [name]: value}))
  }

  async function submit() {
    setLoading(true);
    try {
      let createdAccount = await apiCall(...api.user.generate(), account);

      // Update the list based on the created account role code
      if (createdAccount.role_id.code === SALESTAFF_PERMISSION) {
        setStaffs(prev => [...prev, createdAccount]);
      } else {
        setManagers(prev => [...prev, createdAccount]);
      }
      setAccount(DEFAULT_ACCOUNT);
      notify("success", "Process is completed", "Register new user successfully.");
    } catch (err) {
      notify("error", "The process cannot be completed", err);
    }
    return setLoading(false);
  }

  function hdChangeRole(role) {
    setAccount(prev => ({...prev, role}))
  }

  return (
    <div>
      <Card className="gx-card" title="Register new user">
        <Spin spinning={loading}>
          <Form layout="horizontal">
            <FormItem
              label="Account Email"
              labelCol={{xs: 24, sm: 6}}
              wrapperCol={{xs: 24, sm: 10}}
            >
              <Input
                placeholder="Enter the email here..."
                name="email"
                value={account.email}
                onChange={hdChange}
              />
            </FormItem>
            <FormItem
              label="Edition Quality"
              labelCol={{xs: 24, sm: 6}}
              wrapperCol={{xs: 24, sm: 10}}
            >
              <Select
                className="gx-mr-3 gx-mb-3"
                value={account.role}
                onChange={hdChangeRole}
              >
                <Option value={SALESTAFF_PERMISSION}>Sale Staff</Option>
                <Option value={MANAGER_PERMISSION}>Manager</Option>
              </Select>
            </FormItem>
            <FormItem
              wrapperCol={{
                xs: 24,
                sm: {span: 14, offset: 6}
              }}
            >
              <Button type="primary" onClick={submit}>Submit</Button>
            </FormItem>
          </Form>
        </Spin>
      </Card>
      <Card title="List of Customer Accounts">
        <Spin spinning={loading}>
          <Table
            className="gx-table-responsive"
            dataSource={customers}
            rowKey="_id"
            columns={[
              {
                title: "Avatar",
                dataIndex: "user_id.avatar.link",
                render: text => <span>{`${text.substring(0, 20)}...`}</span>
              },
              {
                title: "Email",
                dataIndex: 'user_id.email',
              },
              {
                title: 'Username',
                dataIndex: 'user_id.username'
              }
            ]}
          />
        </Spin>
      </Card>
      <Card title="List of Salestaff Accounts">
        <Spin spinning={loading}>
          <Table
            className="gx-table-responsive"
            dataSource={staffs}
            rowKey="_id"
            columns={[
              {
                title: "Avatar",
                dataIndex: "user_id.avatar.link",
                render: text => <span>{`${text.substring(0, 20)}...`}</span>
              },
              {
                title: "Email",
                dataIndex: 'user_id.email'
              },
              {
                title: 'Username',
                dataIndex: 'user_id.username'
              }
            ]}
          />
        </Spin>
      </Card>
      <Card title="List of Manager Accounts">
        <Spin spinning={loading}>
          <Table
            className="gx-table-responsive"
            dataSource={managers}
            rowKey="_id"
            columns={[
              {
                title: "Avatar",
                dataIndex: "user_id.avatar.link",
                render: text => <span>{`${text.substring(0, 20)}...`}</span>
              },
              {
                title: "Email",
                dataIndex: 'user_id.email',
              },
              {
                title: 'Username',
                dataIndex: 'user_id.username'
              }
            ]}
          />
        </Spin>
      </Card>
    </div>
  )
}

export default withNoti(Account);
