import React, {useState, useEffect, useCallback} from "react";
import {
    Card, Spin, Form, Upload, Checkbox,
    DatePicker, Icon, Input, Button, Select
} from "antd";
import moment from "moment";
import {getBase64} from "util/uploaderUtil";
import {apiCall} from "constants/apiCall";
import api from "constants/api";

const FormItem = Form.Item;
const Option = Select.Option;

const DEFAULT_BOOK = {
    name: "",
    isbn: "",
    bookcare: false,
    image: {
        file: undefined,
        url: ""
    },
    publish: {
        at: moment(),
        by: undefined
    },
    language: "English",
    genre_ids: [],
    author_ids: []
}

function BookForm({book, notify, hdSubmit, loading, setLoading, isProvider, hdCancel}) {
    const [bookData, setBookData] = useState(DEFAULT_BOOK);
    const [publishers, setPublisher] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    const load = useCallback(async() => {
        let publisherData = await apiCall(...api.publisher.get());
        let genreData = await apiCall(...api.genre.get());
        let authorData = await apiCall(...api.author.get());
        setPublisher(publisherData);
        setGenres(genreData);
        setAuthors(authorData);
        setBookData(book ? book : DEFAULT_BOOK);
        setLoading(false);
    }, [book, setLoading])

    useEffect(() => {
        load()
    }, [load])

    function hdChange(e) {
        const {name, value} = e.target;
        setBookData(prev => ({...prev, [name]: value}))
    }

    function setPublishTime(date, dateString) {
        return setBookData(prev => ({
            ...prev,
            publish: {
                ...prev.publish,
                at: date
            }
        }))
    }

    function selectPub(value) {
        setBookData(prev => ({
            ...prev,
            publish: {
                ...prev.publish,
                by: value
            }
        }))
    }

    const selectGenre = genre_ids => setBookData(prev => ({ ...prev, genre_ids }))

    const selectAuthor = author_ids => setBookData(prev => ({ ...prev, author_ids }))

    function hdChangeImage(info) {
        getBase64(info.file, imageUrl => setBookData(prev => ({
                ...prev,
                image: {
                    ...prev.image,
                    url: imageUrl
                }
            }))
        );
    };

    function beforeUpload(file) {
        setBookData(prev => ({
            ...prev,
            image: {
                ...prev.image,
                file
            }
        }))
        return false;
    }

    const useBookcare = () => setBookData(prev => ({...prev, bookcare: !prev.bookcare}));

    async function submit() {
        setLoading(true);
        try {
            // create form data and fill data into form data
            let fd = new FormData();
            if(bookData.image.file) fd.append("image", bookData.image.file);
            fd.append("name", bookData.name);
            fd.append("isbn", bookData.isbn);
            fd.append("publish.at", bookData.publish.at);
            fd.append("publish.by", bookData.publish.by);
            fd.append("language", bookData.language);
            fd.append("bookcare", bookData.bookcare);
            fd.append("genreIds", JSON.stringify(bookData.genre_ids));
            fd.append("authorIds", JSON.stringify(bookData.author_ids));
            fd.append("reviewed", isProvider ? "0" : "1");

            await hdSubmit(fd);
        } catch(err) {
            notify("error", "Data is not submitted");
            setLoading(false);
        }
    }

    return (
        <Card className="gx-card" title={!bookData._id ? "Add New Book" : "Edit Book"}>
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
                                bookData.image.url.length > 0
                                ? <img src={bookData.image.url} alt=""/>
                                : <div>
                                    <Icon type={bookData.image.loading ? 'loading' : 'plus'}/>
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
                            value={bookData.name}
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
                            value={bookData.isbn}
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
                            value={bookData.language}
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
                            value={bookData.publish.by}
                        >
                            {publishers.map((v, i) => <Option value={v._id} key={i}>{v.name}</Option>)}
                        </Select>
                    </FormItem>
                    <FormItem
                        label="Published on"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <DatePicker
                            className="gx-mb-3 gx-w-100"
                            onChange={setPublishTime}
                            value={bookData.publish.at}
                        />
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
                            value={bookData.genre_ids}
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
                            value={bookData.author_ids}
                        >
                            { authors.map((v, i) => <Option value={v._id} key={i}>{v.name}</Option>) }
                        </Select>
                    </FormItem>
                    <FormItem
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <Checkbox
                            checked={bookData.bookcare}
                            onChange={useBookcare}
                        >
                            Bookcare can be applied for this book
                        </Checkbox>
                    </FormItem>
                    <FormItem
                        wrapperCol={{
                            xs: 24,
                            sm: {span: 14, offset: 6}
                        }}
                    >
                        <Button type="primary" onClick={submit}>
                            { bookData._id ? "Save changes" : "Submit" }
                        </Button>
                        {
                            hdCancel && <Button type="default" onClick={() => hdCancel(DEFAULT_BOOK)}>
                                Cancel
                            </Button>
                        }
                    </FormItem>
                </Form>
            </Spin>
        </Card>
    )
}

export default BookForm;
