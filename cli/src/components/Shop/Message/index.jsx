import React from "react"

function Message({isNegative, content}) {
    return (
        <div className={`k-message ${isNegative ? "error" : "success"}`}>
            {content}
        </div>
    )
}

export default Message;
