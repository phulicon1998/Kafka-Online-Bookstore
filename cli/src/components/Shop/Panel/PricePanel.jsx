import React from "react";

function PricePanel({total, cover, shipping}) {

    return (
        <div className="price-panel">
            <div>
                <input type="text" name="" placeholder="Type discount code here..."/>
                <button>Apply</button>
            </div>
            <div>
                <div>
                    <p>Notional Price</p>
                    <p>$ {(total - cover - shipping).toFixed(2)}</p>
                </div>
                <div>
                    <p>Shipping price</p>
                    <p>$ {shipping.toFixed(2)}</p>
                </div>
                <div>
                    <p>Cover price</p>
                    <p>$ {cover.toFixed(2)}</p>
                </div>
            </div>
            <div>
                <p>Total Price</p>
                <p>${total.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default PricePanel;
