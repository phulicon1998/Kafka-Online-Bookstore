import React from "react";

const SocialButton = ({name, icon, color, onClick}) => (
    <button
        className="social-btn"
        onClick={onClick}
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
