import React from "react";

function PricePanel() {
    return (
        <div className="price-panel">
            <div>
                <input type="text" name="" placeholder="Type discount code here..."/>
                <button>Apply</button>
            </div>
            <div>
                <div>
                    <p>Notional Price</p>
                    <p>$0.00</p>
                </div>
                <div>
                    <p>Shipping price</p>
                    <p>$0.00</p>
                </div>
                <div>
                    <p>Cover price</p>
                    <p>$0.00</p>
                </div>
            </div>
            <div>
                <p>Total Price</p>
                <p>$0.00</p>
            </div>
        </div>
        )
    }

    export default PricePanel;
