import React, {useState, useEffect} from "react";
import {
    Card,
    Table,
    Divider,
    Form,
    Input,
    Button,
    DatePicker,
    Icon,
    Select,
    Upload
} from "antd";
import api from "constants/api";
import {apiCall, apiFdCall} from "constants/apiCall";
import withNoti from "hocs/App/withNoti";
import PopConfirm from "components/Shop/Pop/PopConfirm";
import {getBase64} from "util/uploaderUtil";
import moment from "moment";

const FormItem = Form.Item;
const Option = Select.Option;

const DEFAULT_BOOK = {
    name: "",
    isbn: "",
    bookcare: false,
    image: {
        file: "",
        loading: false,
        preview: ""
    },
    publish: {
        at: new Date(),
        by: ""
    },
    language: "English"
}

function Book({notify}) {
    const [books, setBooks] = useState([]);
    const [publishers, setPublisher] = useState([]);
    const [book, setBook] = useState(DEFAULT_BOOK);

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function load() {
        try {
            let data = await apiCall(...api.book.get());
            let publisherData = await apiCall(...api.publisher.get());
            setPublisher(publisherData);
            setBooks(data);
        } catch(err) {
            notify("error", "Data is not loaded");
        }
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setBook(prev => ({...prev, [name]: value}))
    }

    function setPublishTime(date, dateString) {
        return setBook(prev => ({
            ...prev,
            publish: {
                ...prev.publish,
                at: date
            }
        }))
    }

    function selectPub(value) {
        setBook(prev => ({
            ...prev,
            publish: {
                ...prev.publish,
                by: value
            }
        }))
    }

    function hdChangeImage(info) {
        setBook(prev => ({
            ...prev,
            image: {
                ...prev.image,
                loading: true
            }
        }));

        getBase64(info.file, imageUrl => {
            return setBook(prev => ({
                ...prev,
                image: {
                    ...prev.image,
                    loading: false,
                    preview: imageUrl
                }
            }))
        });

    };

    function beforeUpload(file) {
        setBook(prev => ({
            ...prev,
            image: {
                ...prev.image,
                file
            }
        }))
        return false;
    }

    async function submit() {
        try {
            if(book._id) {
                // let editedBook = await apiCall(...api.book.edit(book._id), book);
                // let newBooks = books.map(v => {
                //     if(v._id === editedBook._id){
                //         return editedBook;
                //     }
                //     return v;
                // })
                // setBooks(newBooks);
                notify("success", "Process is completed", "Book's information is updated successfully.");
            } else {

                // create form data and fill data into form data
                let fd = new FormData();
                fd.append("image", book.image.file);
                fd.append("name", book.name);
                fd.append("isbn", book.isbn);
                fd.append("publish.at", book.publish.at);
                fd.append("publish.by", book.publish.by);
                fd.append("language", book.language);

                let createdBook = await apiFdCall(...api.book.create(), fd);
                setBooks(prev => [...prev, createdBook]);
                notify("success", "Process is completed", "Adding new book successfully.");
            }
            setBook(DEFAULT_BOOK);
        } catch(err) {
            return notify("error", "Data is not submitted");
        }
    }

    async function remove(book_id) {
        try {
            if(book._id !== book_id) {
                await apiCall(...api.book.remove(book_id));
                let newBooks = books.filter(v => v._id !== book_id);
                setBooks(newBooks);
                return notify("success", "Process is completed", "Book is removed successfully.");
            }
            setBook(DEFAULT_BOOK);
            return notify("error", "Data is not removed", "The data is in used in a different process.")
        } catch(err) {
            return notify("error", "Data is not removed");
        }
    }

    function edit(book) {
        setBook(book);
    }

    return (
        <div>
            <Card className="gx-card" title={!book._id ? "Add New Book" : "Edit Book"}>
                <Form layout="horizontal">
                    <FormItem
                        label="Book Name"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <Upload
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={hdChangeImage}
                        >
                            {
                                book.image.preview.length > 0
                                ? <img src={book.image.preview} alt=""/>
                                : <div>
                                    <Icon type={book.image.loading ? 'loading' : 'plus'}/>
                                    <div className="ant-upload-text">Upload</div>
                                </div>
                            }
                        </Upload>
                    </FormItem>
                    <FormItem
                        label="Book Name"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <Input
                            placeholder="Enter the name here..."
                            name="name"
                            value={book.name}
                            onChange={hdChange}
                        />
                    </FormItem>
                    <FormItem
                        label="Book ISBN"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <Input
                            placeholder="Enter the isbn here..."
                            name="isbn"
                            value={book.isbn}
                            onChange={hdChange}
                        />
                    </FormItem>
                    <FormItem
                        label="Publisher"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <Select
                            showSearch
                            placeholder="Select a publisher"
                            optionFilterProp="children"
                            onChange={selectPub}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {publishers.map((v, i) => <Option value={v._id} key={i}>{v.name}</Option>)}
                        </Select>
                    </FormItem>
                    <FormItem
                        label="Published on"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <DatePicker className="gx-mb-3 gx-w-100" onChange={setPublishTime}/>
                    </FormItem>
                    <FormItem
                        wrapperCol={{
                            xs: 24,
                            sm: {span: 14, offset: 6}
                        }}
                    >
                        <Button type="primary" onClick={submit}>{book._id ? "Save changes" : "Submit"}</Button>
                        {book._id && <Button type="default" onClick={() => setBook(DEFAULT_BOOK)}>Cancel</Button>}
                    </FormItem>
                </Form>
            </Card>
            <Card title="Selection Table">
                <Table
                    className="gx-table-responsive"
                    dataSource={books}
                    rowKey="_id"
                    bordered
                    columns={[
                        {
                            title: "Book Cover",
                            dataIndex: 'image.url',
                        },
                        {
                            title: "Book name",
                            dataIndex: 'name',
                        },
                        {
                            title: "Bookcare",
                            dataIndex: 'bookcare',
                            render: (text, record) => <span>{text.toString()}</span>,
                        },
                        {
                            title: "Book ISBN",
                            dataIndex: 'isbn',
                        },
                        {
                            title: "Language",
                            dataIndex: 'language',
                        },
                        {
                            title: 'Publisher',
                            dataIndex: 'publish.by.name',
                        },
                        {
                            title: 'Publish At',
                            dataIndex: 'publish.at',
                            render: text => <span>{moment(text).format("DD-MM-YYYY")}</span>
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            width: 100,
                            render: (text, record) => (
                                <span>
                                    <span className="gx-link" onClick={edit.bind(this, record)}>Edit</span>
                                    <Divider type="vertical"/>
                                    <PopConfirm
                                        title="Are you sure to delete this book?"
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

export default withNoti(Book);
