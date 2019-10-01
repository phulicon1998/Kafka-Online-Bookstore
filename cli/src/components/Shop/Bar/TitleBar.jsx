import React from "react";

const TitleBar = ({icon, title}) => (
    <h4 className="title-bar"><i className={icon}></i> {title}</h4>
)

export default TitleBar;
