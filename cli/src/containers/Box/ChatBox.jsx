import React, {useState, useEffect, useCallback} from "react";
import {apiCall} from "constants/apiCall";
import {connect} from "react-redux";
import api from "constants/api";
import ioClient from "socket.io-client";
import moment from "moment";
import {
    isPermit,
    CUSTOMER_PERMISSION
} from "constants/credentialControl";
import {sentBy, msgIs} from "constants/messageTypes";

const socket = ioClient("localhost:8080");

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
        <p style={{"textAlign": `${type === sentBy.CUSTOMER ? "right" : "left"}`}}>
            <b>{type === sentBy.CUSTOMER ? "Customer" : "System"}:</b> {text} <i className={icon}></i>
        </p>
    )
}

function ChatBox({user, role, toggle}) {
    const DEFAULT_MESSAGE = {
        type: role.isCustomer ? sentBy.CUSTOMER : sentBy.SYSTEM,
        status: msgIs.SENDING,
        text: ""
    }
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(DEFAULT_MESSAGE);
    const [conversation, setConversation] = useState(null);

    const listenSocket = useCallback(() => {
        // Connect to user conversation
        socket.emit("control chat app");
        socket.emit("customer join", user);

        socket.on("new message", function(message) {
            if(message.type === sentBy.CUSTOMER) {
                // If the message is sent by customer, update msg status
                setMessages(prev => prev.map(v => {
                    return !v._id ? message : v
                }))
            } else {
                // if not, just add it to the message list
                setMessages(prev => [...prev, message]);
            }
        })

        socket.on("create conversation", function(conversation){
            setConversation(conversation);
        })
    }, [user]);

    const load = useCallback(async() => {
        let conversationData = await apiCall(...api.message.getOne(user._id));
        if(conversationData) {
            const {message_id, ...conversationInfo} = conversationData;
            setConversation(conversationInfo);
            setMessages(message_id);
        }
    }, [user._id]);

    useEffect(() => {
        load();
        listenSocket();
        return () => socket.removeAllListeners();
    }, [load, listenSocket])

    function submit(e) {
        e.preventDefault();
        let sentMessage = {
            ...message,
            conversation_id: conversation._id,
            createdAt: moment()
        };
        setMessages(prev => [...prev, sentMessage]);
        socket.emit("create message", sentMessage);
        setMessage(DEFAULT_MESSAGE);
    }

    function hdChange(e) {
        const {value} = e.target;
        setMessage(prev => ({...prev, text: value}));
    }

    return (
        <div className="chat-box">
            <div onClick={() => toggle(prev => !prev)}>
                <h3>Messages</h3>
                <i className="fas fa-angle-down"/>
            </div>
            <div>
                {
                    messages.map((v, i) => (
                        <Message {...v} key={i}/>
                    ))
                }
            </div>
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={message.text}
                    placeholder="Enter something here to chat..."
                    onChange={hdChange}
                />
                <button type="submit"><i className="fas fa-paper-plane"/></button>
            </form>
        </div>
    )
}

function ChatButton({toggle}) {
    return (
        <div className="chat-button" onClick={() => toggle(prev => !prev)}>
            <i className="far fa-comments"/>
            {/* <p>Chat with us</p> */}
        </div>
    )
}


function ChatSection({user, role}) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            {
                open
                ? <ChatBox user={user} role={role} toggle={setOpen}/>
                : <ChatButton toggle={setOpen}/>
            }
        </div>
    )
}

function mapState({user}) {
    return {
        user: user.data,
        role: {
            isCustomer: isPermit(user.data.role)(CUSTOMER_PERMISSION)
        }
    }
}

export default connect(mapState, null)(ChatSection);
