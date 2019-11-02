import React from "react";
import UserCell from "./UserCell/index";

const ChatUserList = ({chatUsers, selectedSectionId, onSelectUser}) => {
    return (
        <div className="gx-chat-user">
            {
                chatUsers.map((chat, index) => <UserCell
                    key={index}
                    chat={chat} 
                    selectedSectionId={chat.user_id._id}
                    onSelectUser={onSelectUser}
                />)
            }
        </div>
    )
};

export default ChatUserList;
