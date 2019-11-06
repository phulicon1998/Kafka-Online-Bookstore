import React, {useState, useEffect, useCallback} from "react";
import {
    Col,
    Row,
    Card,
    Form,
    Input,
    Upload,
    Modal,
    Icon,
    Spin,
    Select,
    Button
} from "antd";
import SearchBar from "components/Shop/Bar/SearchBar";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall, apiFdCall} from "constants/apiCall";
import Widget from "components/Widget/index";
import {quality} from "constants/qualityControl";

const FormItem = Form.Item;
const {TextArea} = Input;
const {Option} = Select;
const {BRAND_NEW, LIKE_NEW, GOOD, ACCEPTABLE} = quality;

const DEFAULT_EDITION = {
    images: [],
    book_id: "",
    desc: "",
    quality: BRAND_NEW,
    price: 0,
    discount: 0
}

const SelectedBook = ({image, name, isbn, authors, deselect}) => (
    <Widget styleName="gx-p-lg-1">
        <Row>
            <Col xl={9} lg={10} md={10} sm={10} xs={24}>
                <img className="gx-rounded-lg gx-w-100" alt="..." src={image.url}/>
            </Col>
            <Col xl={15} lg={14} md={14} sm={14} xs={24}>
                <div className="gx-fnd-content">
                    <p className="gx-text-grey">ISBN - {isbn}</p>
                    <h2 className="gx-text-uppercase gx-text-black gx-font-weight-bold gx-fnd-title">{name}</h2>
                    <p>{authors.toString()}</p>
                    <button onClick={deselect}>Deselect</button>
                </div>
            </Col>
        </Row>
    </Widget>
)

const Book = ({book, select}) => (
    <Widget styleName="gx-card-full gx-dot-arrow-hover">
        <div className="gx-user-wid-row">
            <div className="gx-user-wid gx-mr-3">
                <img alt="..." src={book.image.url} className="gx-object-cover"/>
            </div>
            <div className="gx-user-wid-body gx-py-3 gx-pr-3">
                <div className="ant-row-flex">
                    <h2 className="h4 gx-mr-1 gx-mb-1">{book.name}</h2>
                </div>
                <p className="gx-mb-1 gx-text-grey gx-fs-sm">{book.authors.toString()}<br/> ISBN - {book.isbn}</p>
                <div className="gx-dot-arrow" onClick={select}>
                    <div className="gx-bg-primary gx-hover-arrow">
                        <i className="icon icon-long-arrow-right gx-text-white"/>
                    </div>
                    <div className="gx-dot">
                        <i className="icon icon-ellipse-v gx-text-primary"/>
                    </div>
                </div>
            </div>
        </div>
    </Widget>
)

function SearchView({books, setBooks, hdSelect, ...props}) {
    return (
        <div>
            <Card className="gx-card" title="Select Subject Book">
                <Form layout="horizontal">
                    <FormItem
                        label="Select the subject book"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <SearchBar
                            placeholder="Enter the name of any book or author..."
                            data={books}
                            setData={setBooks}
                            keys={["name", "authors"]}
                            {...props}
                        />
                    </FormItem>
                </Form>
            </Card>
            {
                props.disabled || <Row>
                    {
                        books.map((v, i) => (
                            <Col xl={6} lg={12} md={12} sm={12} xs={24} key={i}>
                                <Book select={hdSelect.bind(this, v)} book={v}/>
                            </Col>
                        ))
                    }
                </Row>
            }
        </div>
    )
}

function CreateEdition({notify, ...props}) {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState({});
    const [edition, setEdition] = useState(DEFAULT_EDITION);
    const [preview, setPreview] = useState({
        url: "",
        visible: false
    })
    const [loading, setLoading] = useState(false);

    const load = useCallback(async() => {
        try {
            let bookData = await apiCall(...api.book.get());
            bookData.forEach(b => b.authors = b.authors.map(a => a.name))
            setBooks(bookData);
        } catch (e) {
            return notify("error", "Data is not loaded");
        }
    }, [notify]);

    useEffect(() => {
        load();
    }, [load]);

    function hdSelect(book) {
        setSelectedBook(book);
        setEdition(prev => ({
            ...prev,
            book_id: book._id
        }))
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setEdition(prev => ({...prev, [name]: value}))
    }

    function hdChangeImg({fileList}) {
        setEdition(prev => ({
            ...prev,
            images: fileList
        }))
    }

    function hdPreview(file) {
        setPreview({url: file.thumbUrl, visible: true});
    }

    function hdCancelPreview() {
        setPreview(prev => ({...prev, visible: false}))
    }

    function hdChangeQuality(quality) {
        setEdition(prev => ({...prev, quality}))
    }

    async function submit() {
        setLoading(true);
        try {
            // Validation for uploading images
            if(edition.images.length < 3) {
                setLoading(false);
                return notify("error", "Data is not submitted", "You have to upload at least 3 images.");
            }

            // Create new form data for submitting
            let fd = new FormData();
            edition.images.forEach(img => fd.append("images", img.originFileObj));
            fd.append("book_id", edition.book_id);
            fd.append("desc", edition.desc);
            fd.append("price", edition.price);
            fd.append("discount", edition.discount);
            fd.append("quality", edition.quality);

            await apiFdCall(...api.edition.create(), fd);

            setEdition(DEFAULT_EDITION);
            setSelectedBook({});
            notify("success", "Data is submitted successfully!", "New edition's information has been saved.");

        } catch (e) {
            notify("error", "Data is not submitted");
        }
        setLoading(false);
    }

    return (
        <div>
            <SearchView
                books={books}
                setBooks={setBooks}
                disabled={!!selectedBook._id}
                hdSelect={hdSelect}
            />
            {
                books.length === 0 && <Card>There is no subject book found. <u>Create one here.</u></Card>
            }
            {
                selectedBook._id && <Row>
                    <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                        <SelectedBook {...selectedBook} deselect={() => setSelectedBook({})}/>
                    </Col>
                    <Col xl={14} lg={24} md={24} sm={24} xs={24}>
                        <Card className="gx-card" title="Edition's Information">
                            <Spin spinning={loading}>
                                <p>Upload Your Images For This Book</p>
                                <Upload
                                    listType="picture-card"
                                    fileList={edition.images}
                                    onPreview={hdPreview}
                                    onChange={hdChangeImg}
                                    beforeUpload={() => false}
                                >
                                    <div>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">Upload</div>
                                    </div>
                                </Upload>
                                <Modal
                                    visible={preview.visible}
                                    footer={null}
                                    onCancel={hdCancelPreview}
                                >
                                    <img
                                        alt="example"
                                        style={{width: '100%'}}
                                        src={preview.url}
                                    />
                                </Modal>
                                <Form layout="vertical">
                                    <FormItem label="Edition's Price">
                                        <Input
                                            type="Number"
                                            placeholder="Enter the price here..."
                                            name="price"
                                            value={edition.price}
                                            onChange={hdChange}
                                        />
                                    </FormItem>
                                    <FormItem label="Price's Discount">
                                        <Input
                                            type="Number"
                                            placeholder="Enter the discount here (Optional)"
                                            name="discount"
                                            value={edition.discount}
                                            onChange={hdChange}
                                        />
                                    </FormItem>
                                    <FormItem label="Edition Quality">
                                        <Select
                                            className="gx-mr-3 gx-mb-3"
                                            value={edition.quality}
                                            onChange={hdChangeQuality}
                                        >
                                            <Option value={BRAND_NEW}>Brand New</Option>
                                            <Option value={LIKE_NEW}>Like New</Option>
                                            <Option value={GOOD}>Good</Option>
                                            <Option value={ACCEPTABLE}>Acceptable</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="Edition's Description">
                                        <TextArea
                                            rows={4}
                                            name="desc"
                                            placeholder="Enter the edition's description here..."
                                            value={edition.desc}
                                            onChange={hdChange}
                                        />
                                    </FormItem>
                                </Form>
                                <Button type="primary" onClick={submit}>Submit</Button>
                            </Spin>
                        </Card>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default withNoti(CreateEdition);
