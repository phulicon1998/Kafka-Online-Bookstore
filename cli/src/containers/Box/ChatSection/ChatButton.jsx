import React from "react";

function ChatButton({toggle, isOpen}) {
    return (
        <div
            className={`chat-button ${isOpen ? "open" : ""}`}
            onClick={() => toggle(prev => !prev)}
        >
            <i className={isOpen ? "icon icon-chevron-down" : "icon icon-chat"}/>
        </div>
    )
}

export default ChatButton;
