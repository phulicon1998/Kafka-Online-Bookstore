import React, {useState, useEffect} from "react";
import {Card, Table, Divider, Form, Input, Button} from "antd";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import withNoti from "hocs/App/withNoti";
import PopConfirm from "components/Shop/Pop/PopConfirm";

const FormItem = Form.Item;

const DEFAULT_GENRE = {
    name: "",
    desc: ""
}

function Genre({notify}) {
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState(DEFAULT_GENRE);

    async function load() {
        try {
            let data = await apiCall("get", api.genre.get());
            setGenres(data);
        } catch(err) {
            notify("error", "Data is not loaded");
        }
    }


    function hdChange(e) {
        const {name, value} = e.target;
        setGenre(prev => ({...prev, [name]: value}))
    }

    async function submit() {
        try {
            if(genre._id) {
                let editedGenre = await apiCall("put", api.genre.edit(genre._id), genre);
                let newGenres = genres.map(v => {
                    if(v._id === editedGenre._id){
                        return editedGenre;
                    }
                    return v;
                })
                setGenres(newGenres);
                notify("success", "Process is completed", "Editing genre is done successfully.");
            } else {
                let createdGenre = await apiCall('post', api.genre.create(), genre);
                setGenres(prev => [...prev, createdGenre]);
                notify("success", "Process is completed", "Adding new genre successfully.");
            }
            setGenre(DEFAULT_GENRE);
        } catch(err) {
            console.log(err);
            return notify("error", "Data is not submitted");
        }
    }

    async function remove(genre_id) {
        try {
            if(genre._id !== genre_id) {
                await apiCall("delete", api.genre.remove(genre_id));
                let newGenres = genres.filter(v => v._id !== genre_id);
                setGenres(newGenres);
                return notify("success", "Process is completed", "Genre is removed successfully.");
            }
            setGenre(DEFAULT_GENRE);
            return notify("error", "Data is not removed", "The data is in used in a different process.")
        } catch(err) {
            return notify("error", "Data is not removed");
        }
    }

    function edit(genre) {
        setGenre(genre);
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Card className="gx-card" title={!genre._id ? "Add New Genre" : "Edit Genre"}>
                <Form layout="horizontal">
                    <FormItem
                        label="Genre Name"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <Input
                            placeholder="Enter the name here..."
                            name="name"
                            value={genre.name}
                            onChange={hdChange}
                        />
                    </FormItem>
                    <FormItem
                        label="Genre Description"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <Input
                            placeholder="Enter the description here..."
                            name="desc"
                            value={genre.desc}
                            onChange={hdChange}
                        />
                    </FormItem>
                    <FormItem
                        wrapperCol={{
                            xs: 24,
                            sm: {span: 14, offset: 6}
                        }}
                    >
                        <Button type="primary" onClick={submit}>{genre._id ? "Save changes" : "Submit"}</Button>
                        {genre._id && <Button type="default" onClick={submit}>Cancel</Button>}
                    </FormItem>
                </Form>
            </Card>
            <Card title="Selection Table">
                <Table
                    className="gx-table-responsive"
                    dataSource={genres}
                    rowKey="_id"
                    columns={[
                        {
                            title: "Genre name",
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
                                        title="Are you sure to delete this genre?"
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

export default withNoti(Genre);
