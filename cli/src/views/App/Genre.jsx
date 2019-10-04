import React, {useState, useEffect} from "react";
import {Card, Table, Divider, Form, Input, Button} from "antd";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import withNoti from "hocs/App/withNoti";

const FormItem = Form.Item;

const columns = [
    {
        title: "Genre name",
        dataIndex: 'name'
    },
    {
        title: 'Description',
        dataIndex: 'desc',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <span className="gx-link">Edit</span>
                <Divider type="vertical"/>
                <span className="gx-link">Delete</span>
            </span>
        ),
    }
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

function Genre({notify}) {
    const [genres, setGenres] = useState([]);

    async function load() {
        try {
            let data = await apiCall("get", api.genre.get());
            setGenres(data);
        } catch(err) {
            console.log(err);
            notify("error", "Data is not loaded");
        }
    }

    useEffect(() => {
        load();
    }, []);

    const formItemLayout = {
        // labelCol: {xs: 24, sm: 6},
        // wrapperCol: {xs: 24, sm: 18},
    };
    const buttonItemLayout = {
        // wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
    };

    return (
        <div>
            <Card className="gx-card" title="Form Layout">
                <Form layout="inline">
                    <FormItem
                        label="Genre Name"
                        {...formItemLayout}
                    >
                        <Input placeholder="input placeholder"/>
                    </FormItem>
                    <FormItem
                        label="Genre Description"
                        {...formItemLayout}
                    >
                        <Input placeholder="input placeholder"/>
                    </FormItem>
                    <FormItem
                        {...buttonItemLayout}
                    >
                        <Button type="primary">Submit</Button>
                    </FormItem>
                </Form>
            </Card>
            <Card title="Selection Table">
                <Table
                    className="gx-table-responsive"
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={genres}
                />
            </Card>
        </div>
    )
}

export default withNoti(Genre);
