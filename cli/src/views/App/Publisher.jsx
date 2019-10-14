import React, {useState, useEffect} from "react";
import {Card, Table, Divider, Form, Input, Button} from "antd";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import withNoti from "hocs/App/withNoti";
import PopConfirm from "components/Shop/Pop/PopConfirm";

const FormItem = Form.Item;
const {TextArea} = Input;

const DEFAULT_PUBLISHER = {
    name: "",
    desc: ""
}

function Publisher({notify}) {
    const [publishers, setPublishers] = useState([]);
    const [publisher, setPublisher] = useState(DEFAULT_PUBLISHER);

    async function load() {
        try {
            let data = await apiCall(...api.publisher.get());
            setPublishers(data);
        } catch(err) {
            notify("error", "Data is not loaded");
        }
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setPublisher(prev => ({...prev, [name]: value}))
    }

    async function submit() {
        try {
            if(publisher._id) {
                let editedPublisher = await apiCall(...api.publisher.edit(publisher._id), publisher);
                let newPublishers = publishers.map(v => {
                    if(v._id === editedPublisher._id){
                        return editedPublisher;
                    }
                    return v;
                })
                setPublishers(newPublishers);
                notify("success", "Process is completed", "Publisher's information is updated successfully.");
            } else {
                let createdPublisher = await apiCall(...api.publisher.create(), publisher);
                setPublishers(prev => [...prev, createdPublisher]);
                notify("success", "Process is completed", "Adding new publisher successfully.");
            }
            setPublisher(DEFAULT_PUBLISHER);
        } catch(err) {
            return notify("error", "Data is not submitted");
        }
    }

    async function remove(publisher_id) {
        try {
            if(publisher._id !== publisher_id) {
                await apiCall(...api.publisher.remove(publisher_id));
                let newPublishers = publishers.filter(v => v._id !== publisher_id);
                setPublishers(newPublishers);
                return notify("success", "Process is completed", "Publisher is removed successfully.");
            }
            setPublisher(DEFAULT_PUBLISHER);
            return notify("error", "Data is not removed", "The data is in used in a different process.")
        } catch(err) {
            return notify("error", "Data is not removed");
        }
    }

    function edit(publisher) {
        setPublisher(publisher);
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Card className="gx-card" title={!publisher._id ? "Add New Publisher" : "Edit Publisher"}>
                <Form layout="horizontal">
                    <FormItem
                        label="Publisher Name"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <Input
                            placeholder="Enter the name here..."
                            name="name"
                            value={publisher.name}
                            onChange={hdChange}
                        />
                    </FormItem>
                    <FormItem
                        label="Publisher's Description"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <TextArea
                            rows={4}
                            name="desc"
                            placeholder="Enter the publisher's description here..."
                            value={publisher.desc}
                            onChange={hdChange}
                        />
                    </FormItem>
                    <FormItem
                        wrapperCol={{
                            xs: 24,
                            sm: {span: 14, offset: 6}
                        }}
                    >
                        <Button type="primary" onClick={submit}>{publisher._id ? "Save changes" : "Submit"}</Button>
                        {publisher._id && <Button type="default" onClick={() => setPublisher(DEFAULT_PUBLISHER)}>Cancel</Button>}
                    </FormItem>
                </Form>
            </Card>
            <Card title="Selection Table">
                <Table
                    className="gx-table-responsive"
                    dataSource={publishers}
                    rowKey="_id"
                    columns={[
                        {
                            title: "Publisher name",
                            dataIndex: 'name'
                        },
                        {
                            title: 'Description',
                            dataIndex: 'desc'
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            render: (text, record) => (
                                <span>
                                    <span className="gx-link" onClick={edit.bind(this, record)}>Edit</span>
                                    <Divider type="vertical"/>
                                    <PopConfirm
                                        title="Are you sure to delete this publisher?"
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
        </div>
    )
}

export default withNoti(Publisher);
