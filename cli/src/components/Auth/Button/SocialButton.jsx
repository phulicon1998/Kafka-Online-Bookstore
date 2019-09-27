import React from "react";

const SocialButton = ({name, icon, color}) => (
    <button
        className="social-btn"
        style={{
            "backgroundColor": `${color}`,
            "borderColor": `${color}`
        }}
    >
        <i className={icon}/>
        <span>{name}</span>
    </button>
)

export default SocialButton;
