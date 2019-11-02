import React from "react";
import {Avatar} from "antd";
import moment from "moment";

const ConversationCell = ({active, onSelect, user_id, message_id}) => {
    return (
        <div className={`gx-chat-user-item ${active ? 'active' : ''}`} onClick={onSelect}>
            <div className="gx-chat-user-row">
                <div className="gx-chat-avatar">
                    <div className="gx-status-pos">
                        <Avatar
                            src={user_id.avatar.link}
                            className="gx-size-40"
                            alt={user_id.username}
                        />
                        <span className={`gx-status gx-small gx-${"online"}`}/>
                    </div>
                </div>

                <div className="gx-chat-info">
                    <span className="gx-name h4">{user_id.username}</span>
                    <div className="gx-chat-info-des gx-text-truncate">
                        {message_id[message_id.length - 1].text.substring(0, 25) + "..."}
                    </div>
                    <div className="gx-last-message-time">
                        {moment(message_id[message_id.length - 1].createdAt).fromNow()}
                    </div>
                </div>

                {
                    message_id.filter(m => !m.isView).length > 0 && <div className="gx-chat-date">
                        <div className="gx-bg-primary gx-rounded-circle gx-badge gx-text-white">{message_id.filter(m => !m.isView).length}</div>
                    </div>
                }
            </div>
        </div>
    )
};

export default ConversationCell;
