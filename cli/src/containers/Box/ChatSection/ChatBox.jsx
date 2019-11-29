import React, {useState, useEffect, useCallback} from "react";
import moment from "moment";
import {sentBy, msgIs} from "constants/messageTypes";

function Message({text, status, type}) {
    let icon;
    switch (status) {
        case msgIs.RECEIVED:
            icon = "fas fa-circle";
            break;
        case msgIs.READ:
            icon = "fas fa-check-circle";
            break;
        default:
            icon = "far fa-circle";
    }
    return (
        <div className={type === sentBy.CUSTOMER ? "right" : "left"}>
            <div>
                <p>{text} </p>
            </div>
        </div>
    )
}

function ChatBox({user, role, toggle, conversation, hdSubmit, messages}) {
    const DEFAULT_MESSAGE = {
        type: role.isCustomer ? sentBy.CUSTOMER : sentBy.SYSTEM,
        status: msgIs.SENDING,
        text: ""
    }
    const [message, setMessage] = useState(DEFAULT_MESSAGE);

    function submit(e) {
        e.preventDefault();
        if(message.text.trim().length > 0) {
            let sentMessage = {
                ...message,
                conversation_id: conversation._id,
                createdAt: moment()
            };
            hdSubmit(sentMessage);
            setMessage(DEFAULT_MESSAGE);
        }
    }

    function hdChange(e) {
        const {value} = e.target;
        setMessage(prev => ({...prev, text: value}));
    }

    return (
        <div className="chat-box">
            <div onClick={() => toggle(prev => !prev)}>
                <h3>Messages</h3>
            </div>
            <div>
                {
                    messages.map((v, i) => (
                        <Message {...v} key={i}/>
                    ))
                }
            </div>
            <form onSubmit={submit}>
                <button><i className="icon icon-files"/></button>
                <input
                    type="text"
                    value={message.text}
                    placeholder="Enter your message here"
                    onChange={hdChange}
                />
                <button type="submit"><i className="fas fa-paper-plane"/></button>
            </form>
        </div>
    )
}

export default ChatBox;
