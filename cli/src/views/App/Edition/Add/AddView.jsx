import React, {useState, useEffect} from "react";
import Widget from "components/Widget/index";
import {
    Col, Row, Card, Form,
    Input, Upload, Modal, Icon,
    Spin, Select, Button
} from "antd";
import {quality} from "constants/qualityControl";
import CKEditor from "react-ckeditor-component";

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
    discount: 0,
    amount: 1
}

function AddView({notify, book, setSelectedBook, hdSubmit, editEdition, loading, setLoading}) {
    const [edition, setEdition] = useState({
        ...DEFAULT_EDITION,
        book_id: book._id
    });
    // const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState({
        url: "",
        visible: false
    })

    useEffect(() => {
        if(editEdition && editEdition._id !== edition._id) {
            const {_id, images, desc, quality, price, discount, amount, book_id} = editEdition;
            setEdition(prev => ({
                _id, images, desc, quality,
                price, discount, amount,
                book_id: book_id._id
            }))
        }
    }, [editEdition, edition._id])

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
        setPreview({url: file.thumbUrl || file.url, visible: true});
    }

    function hdCancelPreview() {
        setPreview(prev => ({...prev, visible: false}))
    }

    function hdChangeQuality(quality) {
        setEdition(prev => ({...prev, quality}))
    }

    async function submit() {
        setLoading(true);
        // Validation for uploading images
        if(edition.images.length < 2) {
            setLoading(false);
            return notify("error", "Data is not submitted", "You have to upload at least 2 images.");
        }

        if(edition.amount < 1) {
            setLoading(false);
            return notify("error", "Data is not submitted", "The amount must be 1 at least.");
        }

        // Create new form data for submitting
        let fd = new FormData();
        if(edition._id) {
            let newImgs = edition.images.filter(img => img.originFileObj);
            let currentImgs = edition.images.filter(img => !img.originFileObj);
            newImgs.forEach(img => fd.append("images", img.originFileObj));
            currentImgs.forEach(img => fd.append("currentImgs[]", JSON.stringify(img)));
        } else {
            edition.images.forEach(img => fd.append("images", img.originFileObj));
        }
        fd.append("book_id", edition.book_id);
        fd.append("desc", edition.desc);
        fd.append("price", edition.price);
        fd.append("discount", edition.discount);
        fd.append("quality", edition.quality);
        fd.append("amount", edition.amount);
        await hdSubmit(fd);
    }

    function hdDescChange(e) {
        const desc = e.editor.getData();
        console.log(typeof desc);
        setEdition(prev => ({...prev, desc}))
    }

    return (
        <Row>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Card className="gx-card" title="Edition's Information">
                    <Spin spinning={loading}>
                        <Form layout="vertical">
                            <FormItem label="Amount of Edition">
                                <Input
                                    type="Number"
                                    placeholder="Enter the amount here..."
                                    name="amount"
                                    value={edition.amount}
                                    onChange={hdChange}
                                />
                            </FormItem>
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
                                {/* <TextArea
                                    rows={4}
                                    name="desc"
                                    placeholder="Enter the edition's description here..."
                                    value={edition.desc}
                                    onChange={hdChange}
                                /> */}
                                <CKEditor
                                    activeClass="p10"
                                    content={edition.desc}
                                    events={{
                                        'change': hdDescChange
                                    }}
                                />
                            </FormItem>
                        </Form>
                    </Spin>
                </Card>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Widget styleName="gx-p-lg-1">
                    <Spin spinning={loading}>
                        <Row>
                            <Col xl={9} lg={10} md={10} sm={10} xs={24}>
                                <img className="gx-rounded-lg gx-w-100" alt="..." src={book.image.url}/>
                            </Col>
                            <Col xl={15} lg={14} md={14} sm={14} xs={24}>
                                <div className="gx-fnd-content">
                                    <p className="gx-text-grey">ISBN - {book.isbn}</p>
                                    <h2 className="gx-text-uppercase gx-text-black gx-font-weight-bold gx-fnd-title">{book.name}</h2>
                                    <p>Author(s) - {book.authors.map(v => v.name).toString()}</p>
                                    <p>Genre(s) - {book.genres.map(v => v.name).toString()}</p>
                                    <br/>
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
                                </div>
                            </Col>
                        </Row>
                    </Spin>
                </Widget>
                <Card className="gx-card" title="Confirm Edition Information?">
                    <Spin spinning={loading}>
                        <Button type="primary" onClick={submit}>Confirm & Save</Button>
                        {setSelectedBook && <Button type="default" onClick={() => setSelectedBook({})}>Cancel</Button>}
                    </Spin>
                </Card>
            </Col>
        </Row>
    )
}

export default AddView;
