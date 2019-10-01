import React from "react";

const FootBook = ({img, name, author, rate}) => (
    <div className="foot-book">
        <img src={img} alt="img" className="img-responsive"/>
        <div>
            <h4>{name}</h4>
            <p>{author}</p>
            <p><i className="fas fa-star"/> {rate}/5 stars</p>
        </div>
    </div>
)

export default FootBook;
