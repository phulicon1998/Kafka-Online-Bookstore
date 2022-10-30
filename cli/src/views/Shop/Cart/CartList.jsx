import React from "react";

import TitleBar from "components/Shop/Bar/TitleBar";
import CartBook from "containers/Product/CartBook";

const EmptyCart = ({back, msg}) => (
  <div className="empty-cart">
    <i className="fas fa-cart-arrow-down fa-6x"></i>
    <p>{msg}</p>
    {back && <a href="/store">Back to store</a>}
  </div>
);

const CartList = ({empty, carts}) => (
  <div>
    <TitleBar title="Your cart" icon="fas fa-list-ul"/>
    {
      !empty
        ? (
          <div className="cart-table">
            <div className="row">
              <div className="col-md-6">Books</div>
              <div className="col-md-3">Price</div>
              <div className="col-md-3">Amount</div>
            </div>
            <div className="list">
              {
                carts.map((v, i) => (
                  <CartBook
                    {...v}
                    img={v.book_id.image.url}
                    name={v.book_id.name}
                    author={v.authors.map(v => v.name).toString()}
                    quantity={v.quantity}
                    key={i}
                  />
                ))
              }
            </div>
          </div>
        )
        : <EmptyCart msg="You don't have any books inside cart yet" back/>
    }
  </div>
)

export default CartList;
