import React from "react";
import {Avatar} from "antd";
import moment from "moment";

const SentMessageCell = ({conversation}) => {
    return (
        <div className="gx-chat-item gx-flex-row-reverse">
            <Avatar
                className="gx-size-40 gx-align-self-end"
                src='https://via.placeholder.com/150x150'
                alt={conversation.name}
            />
            <div className="gx-bubble-block">
                <div className="gx-bubble">
                    <div className="gx-message">{conversation.text}</div>
                    <div className="gx-time gx-text-muted gx-text-right gx-mt-2">{moment(conversation.createdAt).format("hh:mm:ss A")}</div>
                </div>
            </div>
        </div>
    )
};

export default SentMessageCell;
