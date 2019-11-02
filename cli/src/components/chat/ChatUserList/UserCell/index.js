import React from "react";
import {Avatar} from "antd";

const UserCell = ({chat, selectedSectionId, onSelectUser}) => {
    return (
        <div
            className={`gx-chat-user-item ${selectedSectionId === chat.user_id._id ? 'active' : ''}`} onClick={() => { onSelectUser.bind(this, chat) }}>
        <div className="gx-chat-user-row">
            <div className="gx-chat-avatar">
                <div className="gx-status-pos">
                    <Avatar src={chat.user_id.avatar.link} className="gx-size-40" alt={chat.user_id.username}/>
                    <span className={`gx-status gx-small gx-${chat.status}`}/>
                </div>
            </div>

            <div className="gx-chat-info">
                <span className="gx-name h4">{chat.user_id.username}</span>
                <div className="gx-chat-info-des gx-text-truncate">{chat.message_id[chat.message_id.length - 1].text.substring(0, 25) + "..."}</div>
                <div className="gx-last-message-time">{chat.lastMessageTime}</div>
            </div>

            {chat.message_id.filter(m => !m.isView).length > 0 ? <div className="gx-chat-date">
                <div className="gx-bg-primary gx-rounded-circle gx-badge gx-text-white">{chat.message_id.filter(m => !m.isView).length}</div>
            </div> : null}
        </div>
    </div>
)
};

export default UserCell;
