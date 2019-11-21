import React, {useState, useEffect, useCallback} from "react";
import {Card, Table, Divider, Form, Input, Button, Select} from "antd";
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

    const load = useCallback(async() => {
        try {
            // let data = await apiCall(...api.account.get());
            // setStaffs(data);
        } catch(err) {
            notify("error", "Data is not loaded");
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
        try {
            let createdAccount = await apiCall(...api.user.create("staff"), account);
            setStaffs(prev => [...prev, createdAccount]);
            notify("success", "Process is completed", "Register new user successfully.");
            setAccount(DEFAULT_ACCOUNT);
        } catch(err) {
            return notify("error", "Data is not submitted");
        }
    }

    function hdChangeRole(quality) {
        setAccount(prev => ({...prev, quality}))
    }

    return (
        <div>
            <Card className="gx-card" title="Register new user">
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
            </Card>
        </div>
    )
}

export default withNoti(Account);
