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
    Spin,
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
        preview: ""
    },
    publish: {
        at: moment(),
        by: undefined
    },
    language: "English",
    genre_id: [],
    author_id: []
}

function Book({notify}) {
    const [books, setBooks] = useState([]);
    const [publishers, setPublisher] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [book, setBook] = useState(DEFAULT_BOOK);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function load() {
        try {
            let data = await apiCall(...api.book.get());
            let publisherData = await apiCall(...api.publisher.get());
            let genreData = await apiCall(...api.genre.get());
            let authorData = await apiCall(...api.author.get());
            setPublisher(publisherData);
            setGenres(genreData);
            setAuthors(authorData);
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

    const selectGenre = genre_id => setBook(prev => ({ ...prev, genre_id }))

    const selectAuthor = author_id => setBook(prev => ({ ...prev, author_id }))

    function hdChangeImage(info) {
        getBase64(info.file, imageUrl => setBook(prev => ({
                ...prev,
                image: {
                    ...prev.image,
                    preview: imageUrl
                }
            }))
        );
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
            setLoading(true);
            // create form data and fill data into form data
            let fd = new FormData();
            fd.append("image", book.image.file);
            fd.append("name", book.name);
            fd.append("isbn", book.isbn);
            fd.append("publish.at", book.publish.at);
            fd.append("publish.by", book.publish.by);
            fd.append("language", book.language);
            fd.append("genreId", JSON.stringify(book.genre_id));
            fd.append("authorId", JSON.stringify(book.author_id));

            if(!book._id) {
                // if book id not exists then submit takes up creating data
                let createdBook = await apiFdCall(...api.book.create(), fd);
                setBooks(prev => [...prev, createdBook]);
                notify("success", "Process is completed", "Adding new book successfully.");
            } else {
                // vice versa for editting data
                let editedBook = await apiCall(...api.book.edit(book._id), book);
                let newBooks = books.map(v => {
                    if(v._id === editedBook._id){
                        return editedBook;
                    }
                    return v;
                })
                setBooks(newBooks);
                notify("success", "Process is completed", "Book's information is updated successfully.");
            }
            setBook(DEFAULT_BOOK);
            setLoading(false);
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
            return notify("error", "Data is not removed", "The data is in used in a different process.");
        } catch(err) {
            return notify("error", "Data is not removed");
        }
    }

    function hdEdit(book) {
        console.log(book);

        setBook(prev => ({...prev, image: {
            ...prev.image,
            preview: book.url
        }}) );
    }

    return (
        <div>
            <Card className="gx-card" title={!book._id ? "Add New Book" : "Edit Book"}>
                <Spin spinning={loading}>
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
                            label="Language"
                            labelCol={{xs: 24, sm: 6}}
                            wrapperCol={{xs: 24, sm: 10}}
                        >
                            <Input
                                placeholder="Please enter the book's language here..."
                                name="language"
                                value={book.language}
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
                                value={book.publish.by}
                            >
                                {publishers.map((v, i) => <Option value={v._id} key={i}>{v.name}</Option>)}
                            </Select>
                        </FormItem>
                        <FormItem
                            label="Published on"
                            labelCol={{xs: 24, sm: 6}}
                            wrapperCol={{xs: 24, sm: 10}}
                        >
                            <DatePicker className="gx-mb-3 gx-w-100" onChange={setPublishTime} value={book.publish.at}/>
                        </FormItem>
                        <FormItem
                            label="Select genre"
                            labelCol={{xs: 24, sm: 6}}
                            wrapperCol={{xs: 24, sm: 10}}
                        >
                            <Select
                                mode="multiple"
                                style={{width: '100%'}}
                                placeholder="Genre"
                                onChange={selectGenre}
                                value={book.genre_id}
                            >
                                { genres.map((v, i) => <Option value={v._id} key={i}>{v.name}</Option>) }
                            </Select>
                        </FormItem>
                        <FormItem
                            label="Select author"
                            labelCol={{xs: 24, sm: 6}}
                            wrapperCol={{xs: 24, sm: 10}}
                        >
                            <Select
                                mode="multiple"
                                style={{width: '100%'}}
                                placeholder="Author"
                                onChange={selectAuthor}
                                value={book.author_id}
                            >
                                { authors.map((v, i) => <Option value={v._id} key={i}>{v.name}</Option>) }
                            </Select>
                        </FormItem>
                        <FormItem
                            wrapperCol={{
                                xs: 24,
                                sm: {span: 14, offset: 6}
                            }}
                        >
                            <Button type="primary" onClick={submit}>
                                { book._id ? "Save changes" : "Submit" }
                            </Button>
                            {
                                book._id && <Button
                                    type="default"
                                    onClick={() => setBook(DEFAULT_BOOK)}
                                >
                                    Cancel
                                </Button>
                            }
                        </FormItem>
                    </Form>
                </Spin>
            </Card>
            <Card title="Selection Table">
                <Spin spinning={loading}>
                    <Table
                        className="gx-table-responsive"
                        dataSource={books}
                        rowKey="_id"
                        columns={[
                            {
                                title: "Book Cover",
                                dataIndex: 'image.url',
                                render: text => <span>{text.substring(0, 20)}...</span>
                            },
                            {
                                title: "Book name",
                                dataIndex: 'name',
                            },
                            {
                                title: "Genres",
                                dataIndex: 'genres',
                                render: text => <span>{text.map(v => v.name).toString()}</span>
                            },
                            {
                                title: "Authors",
                                dataIndex: 'authors',
                                render: text => <span>{text.map(v => v.name).toString()}</span>
                            },
                            {
                                title: "Bookcare",
                                dataIndex: 'bookcare',
                                render: text => <span>{text.toString()}</span>,
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
                                        <span
                                            className="gx-link"
                                            onClick={hdEdit.bind(this, record)}
                                        >
                                            Edit
                                        </span>
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
                </Spin>
            </Card>
        </div>
    )
}

export default withNoti(Book);
