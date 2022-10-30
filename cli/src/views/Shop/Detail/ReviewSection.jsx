import React, {useState} from "react";
import moment from "moment";
import {Rate, Upload, Icon, Modal} from 'antd';
import api from "constants/api";
import {apiCall, apiFdCall} from "constants/apiCall";

const Review = ({username, rate, title, content, userLiked, createdAt, canRemove, doRemove}) => (
  <div className="row">
    <div className="col-md-1 text-center">
      <i className="fas fa-book-reader"/>
    </div>
    <div className="col-md-10">
      <div>
        <div>
          <p><b>{username}</b> has rated it</p>
          <Rate value={rate}/>
        </div>
        <div>
          <p>{moment(createdAt).format("DD-MM-YYYY, h:mm:ss a")}</p>
          {canRemove && <button onClick={doRemove}>Remove</button>}
        </div>
      </div>
      <h4><b>{title}</b></h4>
      <p>{content}</p>
      <span>This review is useful, isn't it?</span>
      <button><i className="far fa-thumbs-up"/> Likes ({userLiked.length})</button>
    </div>
  </div>
)

const DEFAULT_REVIEW = {
  images: [],
  rate: 0,
  title: "",
  content: ""
}

function ReviewSection({user, edition, reviews, setReviews}) {
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState(DEFAULT_REVIEW);
  const [preview, setPreview] = useState({
    url: "",
    visible: false
  });
  const [loading, setLoading] = useState(false);

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

  async function removeReview(review_id) {
    await apiCall(...api.review.remove(edition._id, review_id));
    let newReviews = reviews.filter(v => v._id !== review_id);
    setReviews(newReviews);
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
      <div className="store-detail-review">
        <h4>Community reviews
          {open || <span onClick={() => setOpen(prev => !prev)}><i className="far fa-edit"/> Rate & write review</span>}
          {/* <a href="/login"><i className="far fa-edit"/> Login To Write Review</a> */}
        </h4>
        <p><i className="far fa-caret-square-down"/> Rating Details</p>
        {
          open && <div className="row">
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
              <button onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </div>
        }
      </div>
      <div className="store-row-review">
        {
          reviews.length > 0
            ? reviews.map((v, i) => (
              <Review
                {...v}
                username={v.user_id.username}
                canRemove={v.user_id._id === user._id}
                doRemove={removeReview.bind(this, v._id)}
                key={i}
              />
            ))
            : <div className="empty-wish">
              <p>There is no reviews yet.</p>
            </div>
        }
      </div>
    </div>
  )
}

export default ReviewSection;
