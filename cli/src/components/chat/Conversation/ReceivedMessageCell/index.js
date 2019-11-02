import React from "react";
import {Avatar} from "antd";
import moment from "moment";

const ReceivedMessageCell = ({conversation, user}) => {
    return (
        <div className="gx-chat-item">
            <Avatar
                className="gx-size-40 gx-align-self-end"
                src={user.avatar.link}
                alt=""
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

export default ReceivedMessageCell;
