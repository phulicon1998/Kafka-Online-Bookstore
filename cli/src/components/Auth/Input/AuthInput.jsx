import React from "react";

const AuthInput = ({icon, type, hide, ...input}) => (
    <div className={`auth-input${hide ? hide : ""}`}>
        <i className={icon}/>
        <input type={type ? type : "text"} {...input}/>
    </div>
)

export default AuthInput;
