import React, {useState, useEffect, useCallback} from "react";
import api from "constants/api";
import {apiCall, apiFdCall} from "constants/apiCall";
import Loader from "components/Shop/Load/Loader";
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import {Rate, Upload, Icon, Modal} from 'antd';
import {connect} from "react-redux";

const DEFAULT_REVIEW = {
    images: [],
    rate: 0,
    title: "",
    content: ""
}

function Detail({match, user, ...props}) {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState(DEFAULT_REVIEW);
    const [quantity, setQuantity] = useState(1);
    const [preview, setPreview] = useState({
        url: "",
        visible: false
    });
    const [edition, setEdition] = useState({
        "_id": "",
        "book_id": {
            bookcare: false,
            name: "...",
            image: {
                url: ""
            }
        },
        price: 0,
        discount: 0,
        genres: [],
        authors: [],
        images: []
    })

    const load = useCallback(async() => {
        const {edition_id} = match.params;
        let retrievedEdition = await apiCall(...api.edition.getOne(edition_id));
        const {review_id, ...editionData} = retrievedEdition;
        setEdition(editionData);
        setReviews(review_id.reverse());
        setLoading(false);
    }, [match.params]);

    useEffect(() => {
        load();
    }, [load])

    function hdChange(e) {
        const {name, value} = e.target;
        setReview(prev => ({...prev, [name]: value}));
    }

    function hdPreview(file) {
        setPreview({url: file.thumbUrl, visible: true});
    }

    function hdCancelPreview() {
        setPreview(prev => ({...prev, visible: false}))
    }

    function hdChangeImg({fileList}) {
        setReview(prev => ({
            ...prev,
            images: fileList
        }))
    }

    async function submitReview() {
        setLoading(true);
        // Create new form data for submitting
        let fd = new FormData();
        review.images.forEach(img => fd.append("images", img.originFileObj));
        fd.append("user_id", user._id);
        fd.append("rate", review.rate);
        fd.append("title", review.title);
        fd.append("content", review.content);

        let returnedReview = await apiFdCall(...api.review.create(edition._id), fd);
        setReviews(prev => ([returnedReview, ...prev]));
        setReview(DEFAULT_REVIEW);
        setLoading(false);
    }

    return (
        <div>
            <Breadcrumb
                paths={[
                    {path: "/", name: "Home"},
                    {path: "/store", name: "Store"}
                ]}
                current={edition.book_id.name}
                viewed
            />
            <div className="container">
                <div className="row" style={{"marginTop": "40px"}}>
                    <div className="col-md-9">
                        <Loader loading={loading}>
                            <div className="store-detail">
                                <div className="row">
                                    <div className="col-md-5">
                                        <img src={edition.book_id.image.url} alt="" className="img-responsive"/>
                                        <div>
                                            {
                                                edition.images.map((v, i) => (
                                                    <img key={i} alt="" src={v.url} className={`img-responsive ${i === 0 ? "active" : ""}`}/>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <p>{edition.genres.map(v => v.name).toString()}</p>
                                        <h2>{edition.book_id.name}</h2>
                                        <p>The <b>15th</b> place in top of <i>world's best seller book this month</i></p>
                                        <p>
                                            <b>Availibility:</b>
                                            <b> {edition.amount > 5 ? "In stock" : `Only ${edition.amount} left`}</b>
                                        </p>
                                        <p>${(edition.price * (100 - edition.discount) / 100).toFixed(2)} <del>${edition.price.toFixed(2)}</del></p>
                                        <hr/>
                                        <p><b>Author:</b> {edition.authors.map(v => v.name).toString()}</p>
                                        <p><b>Bookcare:</b> {edition.book_id.bookcare.toString()}</p>
                                        <hr/>
                                        <p><b>Quantity & Order</b></p>
                                        <div>
                                            <div>
                                                <button>+</button>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                                <button>-</button>
                                            </div>
                                            <button>Add to cart</button>
                                        </div>
                                        <div>
                                            <p><a href="/"><i className="fas fa-heart"/> Add to Wishlist</a></p>
                                            <p><a href="/"><i className="fas fa-clock"/> Buy Used books</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Loader>
                    </div>
                    <div className="col-md-3">
                        <h3>This is designed later</h3>
                    </div>
                    <div className="col-md-12">
                        <div className="order-detail-review">
                            <h4>Community reviews
                                <span><i className="far fa-edit"/> Rate & write review</span>
                                {/* <a href="/login"><i className="far fa-edit"/> Login To Write Review</a> */}
                            </h4>
                            <p><i className="far fa-caret-square-down"/> Rating Details</p>
                            <div className="row">
                                <div className="col-md-1 text-center">
                                    <i className="fas fa-book-reader"/>
                                </div>
                                <div className="col-md-10">
                                    <div>
                                        <span>Your Rate - </span>
                                        <Rate
                                            value={review.rate}
                                            onChange={(rate) => setReview(prev => ({...prev, rate}))}
                                        />
                                        <span className={review.rate > 0 ? "rated" : ""}>- {review.rate}/5 star(s)</span>
                                    </div>
                                    <div>
                                        {/* <p>Upload Your Images For This Book</p> */}
                                        <Upload
                                            listType="picture-card"
                                            fileList={review.images}
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
                                    <textarea
                                        rows="1"
                                        name="title"
                                        placeholder="Write your title here..."
                                        value={review.title}
                                        onChange={hdChange}
                                    />
                                    <textarea
                                        rows="3"
                                        name="content"
                                        placeholder="Review of this book..."
                                        value={review.content}
                                        onChange={hdChange}
                                    />
                                    <button onClick={submitReview}>Send review</button>
                                    <button>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(Detail);
