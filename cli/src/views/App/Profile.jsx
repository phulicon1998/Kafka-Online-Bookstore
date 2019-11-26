import React, {useCallback, useState, useEffect} from "react";
import {Col, Row, Card, Form, Input, Button, Spin} from "antd";
import About from "components/profile/About/index";
import Contact from "components/profile/Contact/index";
import Auxiliary from "util/Auxiliary";
import ProfileHeader from "components/profile/ProfileHeader";
import {connect} from "react-redux"
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import * as credentials from "constants/credentialControl";
import withNoti from "hocs/App/withNoti";

const FormItem = Form.Item;

const DEFAULT_PASSWORD = {
    current: "",
    change: "",
    confirm: ""
}

function Profile({notify, user, role, ...props}) {
    const [password, setPassword] = useState(DEFAULT_PASSWORD);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async() => {
        setLoading(false);
    }, [])

    useEffect(() => {
        load();
    }, [load])

    async function changePassword() {
        setLoading(true);
        if(password.change === password.confirm) {
            try {
                await apiCall(...api.user.changePassword(user._id), password);
                setPassword(DEFAULT_PASSWORD);
                notify("success", "Process is completed!", "Your password has been changed successfully.");
            } catch (e) {
                notify("error", "The process is not completed", e);
            }
        } else {
            notify("error", "The process is not completed", "Please ensure that all your entered data are valid.");
        }
        return setLoading(false);
    }

    function hdChangePassword(e) {
        const {name, value} = e.target;
        setPassword(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function getRoleName() {
        let roleName = "";
        if(role.isSalestaff) roleName = "Salestaff";
        if(role.isManager) roleName = "Manager";
        if(role.isAdmin) roleName = "Administrator";
        return `${roleName} at Kafka Bookstore`;
    }

    return (
        <Auxiliary>
            <ProfileHeader
                username={user.username}
                avatar={user.avatar.link}
                role={getRoleName()}
            />
            <div className="gx-profile-content">
                <Row>
                    <Col xl={16} lg={14} md={14} sm={24} xs={24}>
                        <About/>
                        <Card className="gx-card" title="Change your password">
                            <Spin spinning={loading}>
                                <Form layout="horizontal">
                                    <FormItem
                                        label="Current Password"
                                        labelCol={{xs: 24, sm: 6}}
                                        wrapperCol={{xs: 24, sm: 10}}
                                    >
                                        <Input
                                            type="password"
                                            placeholder="Enter the current password here..."
                                            name="current"
                                            value={password.current}
                                            onChange={hdChangePassword}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="New Password"
                                        labelCol={{xs: 24, sm: 6}}
                                        wrapperCol={{xs: 24, sm: 10}}
                                    >
                                        <Input
                                            type="password"
                                            placeholder="Enter the new password here..."
                                            name="change"
                                            value={password.change}
                                            onChange={hdChangePassword}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Confirm New Password"
                                        labelCol={{xs: 24, sm: 6}}
                                        wrapperCol={{xs: 24, sm: 10}}
                                    >
                                        <Input
                                            type="password"
                                            placeholder="Confirm your password here..."
                                            name="confirm"
                                            value={password.confirm}
                                            onChange={hdChangePassword}
                                        />
                                    </FormItem>
                                    <FormItem
                                        wrapperCol={{
                                            xs: 24,
                                            sm: {span: 14, offset: 6}
                                        }}
                                    >
                                        <Button type="primary" onClick={changePassword}>Save changes</Button>
                                    </FormItem>
                                </Form>
                            </Spin>
                        </Card>
                    </Col>
                    <Col xl={8} lg={10} md={10} sm={24} xs={24}>
                        <Contact/>
                    </Col>
                </Row>
            </div>
        </Auxiliary>
    );
}

function mapState({user}) {
    const {role} = user.data;
    const {isPermit} = credentials;
    return {
        user: user.data,
        role: {
            isSalestaff: isPermit(role)(credentials.SALESTAFF_PERMISSION),
            isManager: isPermit(role)(credentials.MANAGER_PERMISSION),
            isAdmin: isPermit(role)(credentials.ADMIN_PERMISSION)
        }
    }
}

export default connect(mapState, null)(withNoti(Profile));
