import React from "react";
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import TitleBar from "components/Shop/Bar/TitleBar";
import CartTable from "components/Shop/Table/CartTable";
import PricePanel from "components/Shop/Panel/PricePanel";
import {carts} from "./data";

// const EmptyCart = ({back, msg}) => (
//     <div class="empty-cart">
//         <i class="fas fa-cart-arrow-down fa-6x"></i>
//         <p>{msg}</p>
//         {back && <a href="/store">Back to store</a>}
//     </div>
// );

const EmptyWish = ({back, msg}) => (
    <div class="empty-wish">
        <p>{msg}</p>
    </div>
);

function Cart() {
    return (
        <div>
            <Breadcrumb
                paths={[
                    {path: "/", name: "Home"}
                ]}
                current="Cart"
            />
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <TitleBar title="Your cart" icon="fas fa-list-ul"/>
                        <CartTable carts={carts}/>
                    </div>
                    <div className="col-md-4">
                        <TitleBar title="Order detail" icon="fas fa-list-ul"/>
                        <PricePanel/>
                        <div className="cart-button">
                            <button><i class="fas fa-shopping-cart"/> Create order</button>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <TitleBar title="Wishlist" icon="fas fa-list-ul"/>
                        <EmptyWish msg="You don't have any favourite books yet"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
