import React from "react";
import {Avatar} from "antd";
import CustomScrollbars from "util/CustomScrollbars";
import Conversation from "components/chat/Conversation/index";

const Communication = ({message, selectedUser, conversation, onToggleDrawer, _handleKeyPress, updateMessageValue, submitComment}) => (
    <div className="gx-chat-main">
        <div className="gx-chat-main-header">
            <span className="gx-d-block gx-d-lg-none gx-chat-btn">
                <i
                    className="gx-icon-btn icon icon-chat"
                    onClick={onToggleDrawer}
                />
            </span>
            <div className="gx-chat-main-header-info">
                <div className="gx-chat-avatar gx-mr-2">
                    <div className="gx-status-pos">
                        <Avatar src={selectedUser.thumb}
                            className="gx-rounded-circle gx-size-60"
                            alt=""
                        />
                        <span className={`gx-status gx-${selectedUser.status}`}/>
                    </div>
                </div>
                <div className="gx-chat-contact-name">{selectedUser.name}</div>
            </div>
        </div>

        <CustomScrollbars className="gx-chat-list-scroll">
            <Conversation
                conversationData={conversation}
                selectedUser={selectedUser}
            />
        </CustomScrollbars>

        <div className="gx-chat-main-footer">
            <div className="gx-flex-row gx-align-items-center" style={{maxHeight: 51}}>
                <div className="gx-col">
                    <div className="gx-form-group">
                        <textarea
                            id="required"
                            className="gx-border-0 ant-input gx-chat-textarea"
                            onKeyUp={_handleKeyPress}
                            onChange={updateMessageValue}
                            value={message.text}
                            placeholder="Type and hit enter to send message"
                        />
                    </div>
                </div>
                <i className="gx-icon-btn icon icon-sent" onClick={submitComment}/>
            </div>
        </div>
    </div>
)

export default Communication;
