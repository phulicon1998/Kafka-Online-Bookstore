import React, {useState, useEffect} from "react";
import {Card, Table, Divider, Form, Input, Button} from "antd";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import withNoti from "hocs/App/withNoti";
import PopConfirm from "components/Shop/Pop/PopConfirm";

const FormItem = Form.Item;
const {TextArea} = Input;

const DEFAULT_AUTHOR = {
    image: "",
    name: "",
    desc: "",
    follower: 0
}

function Author({notify, ...props}) {
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState(DEFAULT_AUTHOR);

    async function load() {
        try {
            let data = await apiCall(...api.author.get());
            setAuthors(data);
        } catch(err) {
            notify("error", "Data is not loaded");
        }
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setAuthor(prev => ({...prev, [name]: value}))
    }

    async function submit() {
        try {
            if(author._id) {
                let editedAuthor = await apiCall( ...api.author.edit(author._id), author);
                let newAuthors = authors.map(v => {
                    if(v._id === editedAuthor._id){
                        return editedAuthor;
                    }
                    return v;
                })
                setAuthors(newAuthors);
                notify("success", "Process is completed", "Author data is updated successfully");
            } else {
                let createdAuthor = await apiCall(...api.author.create(), author);
                setAuthors(prev => [...prev, createdAuthor]);
                notify("success", "Process is completed", "Adding new author data successfully.");
            }
            setAuthor(DEFAULT_AUTHOR);
        } catch(err) {
            return notify("error", "Data is not submitted");
        }
    }

    async function remove(genre_id) {
        try {
            if(author._id !== genre_id) {
                await apiCall(...api.author.remove(genre_id));
                let newAuthors = authors.filter(v => v._id !== genre_id);
                setAuthors(newAuthors);
                return notify("success", "Process is completed", "Author is removed successfully.");
            }
            setAuthor(DEFAULT_AUTHOR);
            return notify("error", "Data is not removed", "The data is in used in a different process.")
        } catch(err) {
            return notify("error", "Data is not removed");
        }
    }

    function edit(author) {
        setAuthor(author);
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Card className="gx-card" title={!author._id ? "Add New Author" : "Edit Author"}>
                <Form layout="horizontal">
                    <FormItem
                        label="Author Name"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <Input
                            placeholder="Enter the name here..."
                            name="name"
                            value={author.name}
                            onChange={hdChange}
                        />
                    </FormItem>
                    <FormItem
                        label="Author Description"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <TextArea
                            rows={4}
                            name="desc"
                            placeholder="Enter the author's description here..."
                            value={author.desc}
                            onChange={hdChange}
                        />
                    </FormItem>
                    <FormItem
                        wrapperCol={{
                            xs: 24,
                            sm: {span: 14, offset: 6}
                        }}
                    >
                        <Button type="primary" onClick={submit}>{author._id ? "Save changes" : "Submit"}</Button>
                        {author._id && <Button type="default" onClick={() => setAuthor(DEFAULT_AUTHOR)}>Cancel</Button>}
                    </FormItem>
                </Form>
            </Card>
            <Card title="Selection Table">
                <Table
                    className="gx-table-responsive"
                    dataSource={authors}
                    rowKey="_id"
                    columns={[
                        {
                            title: "Author's Name",
                            dataIndex: 'name'
                        },
                        {
                            title: 'Description',
                            dataIndex: 'desc'
                        },
                        {
                            title: 'Number of Follower',
                            dataIndex: 'follower'
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            render: (text, record) => (
                                <span>
                                    <span className="gx-link" onClick={edit.bind(this, record)}>Edit</span>
                                    <Divider type="vertical"/>
                                    <PopConfirm
                                        title="Are you sure to delete this author?"
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

export default withNoti(Author);
