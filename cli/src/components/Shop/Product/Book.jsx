import React from "react";

const Book = ({img, name, author, price, discount}) => (
    <div className="book">
        <div>
            <img src={img} className="img-responsive" alt="img"/>
            <div>
                <p><i className="fas fa-star"/> 4.5/5</p>
                <button>
                    <i className="fas fa-shopping-cart"/>
                </button>
                <button>
                    <i className="far fa-heart"/>
                </button>
            </div>
        </div>
        <a href="/">{name}</a>
        <p>{author}</p>
        <p>{Math.floor(price*discount)}.000đ <span>{price}</span> <span>-{discount}%</span></p>
    </div>
);

export default Book;
