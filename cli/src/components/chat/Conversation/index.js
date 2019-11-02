import React from "react";

import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";
import MESSAGE from "constants/messageTypes";

const Conversation = ({conversationData, selectedUser}) => {
    return (
        <div className="gx-chat-main-content">
            {
                conversationData.map((conversation, index) =>
                    conversation.type !== MESSAGE.CUSTOMER
                    ? <SentMessageCell key={index} conversation={conversation}/>
                    : <ReceivedMessageCell key={index} conversation={conversation} user={selectedUser}/>
                )
            }
        </div>
    )
};

export default Conversation;
