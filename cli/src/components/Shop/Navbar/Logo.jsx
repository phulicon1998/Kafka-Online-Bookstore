import React from "react";

const Logo = ({bigger}) => (
    <a className={`logo ${bigger ? "bigger" : ""}`} href="/">
        <i className="fas fa-book"></i>
        <div>
            <h3>Kafka</h3>
            <p>Book for everyone</p>
        </div>
    </a>
)

export default Logo;
