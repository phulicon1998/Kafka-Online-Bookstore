import React from "react";
import moment from "moment";
import QualityBox from "components/Shop/Box/QualityBox";
import {sendChangeCart} from "appRedux/actions/cart";
import {connect} from "react-redux";
import {Rate} from "antd";
import * as permissions from "constants/credentialControl";

function BookContent({edition, quantity, onChange, qualities, sendChangeCart, role}) {
  return (
    <div className="store-detail-v2">
      <div>
        <div>
          {
            edition.images.map((v, i) => (
              <img key={i} alt="" src={v.url} className={`${i === 0 ? "active" : ""}`}/>
            ))
          }
        </div>
        <img src={edition.book_id.image.url} alt=""/>
      </div>
      <div>
        <p>{(edition.genres.map(v => v.name)).toString().split(",").join(", ")}</p>
        <h2>{edition.book_id.name}</h2>
        <div>
          <Rate defaultValue={edition.review_id ? 5 : 0} disabled style={{fontSize: "20px", "marginTop": "0px"}}/>
          <p>{edition.review_id ? edition.review_id.length : "No review yet"}</p>
        </div>
        <p><b>Authors: </b>{edition.authors.map(v => v.name).toString()}</p>
        <p>
          <b>Availibility:</b>
          <b> {edition.amount > 5 ? "In stock" : `Only ${edition.amount} left`}</b>
        </p>
        <p>${(edition.price * (100 - edition.discount) / 100).toFixed(2)}
          <del>${edition.price.toFixed(2)}</del>
        </p>
        <hr/>
        <p><b>Other Qualities</b></p>
        <div>
          {
            qualities.map((q, i) => (
              <QualityBox {...q} book_id={edition.book_id._id} key={i}/>
            ))
          }
        </div>
        <hr/>
        {role.isCustomer && <p><b>Quantity & Order</b></p>}
        {role.isCustomer && <div>
          <div>
            <button onClick={onChange.bind(this, 1)}>+</button>
            <input type="text" value={quantity}/>
            <button onClick={onChange.bind(this, -1)}>-</button>
          </div>
          <button onClick={() => sendChangeCart(edition._id, quantity)}>
            Add to cart
          </button>
        </div>}
        {role.isCustomer && <div>
          <p><a href="/"><i className="fas fa-heart"/> Add to Wishlist</a></p>
        </div>}
        <hr/>
        {
          edition.book_id.bookcare
            ? <p className="bookcare"><i className="fab fa-bandcamp"/> This product can be used <b>Bookcare</b></p>
            :
            <p className="bookcare"><i className="fab fa-bandcamp"/> There is no bookcare available for this product</p>
        }
        {
          edition.fastDelivery
            ? <p className="delivery-time">
              <i className="fas fa-truck"/> Delivery time estimated may be at <b>Tommorrow</b>,
              on <b>{moment().add(1, "days").format("DD/MM/YYYY")}</b>
            </p>
            : <p className="delivery-time">
              <i className="fas fa-truck"/> Estimated delivery time
              - <b>{moment().add(2, "days").format("ddd, Do")}</b> to <b>{moment().add(5, "days").format("ddd, Do")}</b>
            </p>
        }
      </div>
    </div>
  )
}

function mapState({user}) {
  const {isPermit} = permissions;
  return {
    role: {
      isCustomer: isPermit(user.data.role)(permissions.CUSTOMER_PERMISSION)
    }
  }
}

export default connect(mapState, {sendChangeCart})(BookContent);
