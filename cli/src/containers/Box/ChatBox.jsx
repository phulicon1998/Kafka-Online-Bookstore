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
import MESSAGE from "constants/messageTypes";

const socket = ioClient("localhost:8080");

function Message({text, status, type}) {
    let icon = <i className="far fa-circle"/>
    if(status === 1) icon = <i className="fas fa-circle"/>;
    // if(status === 2) icon = "viewed";
    return (
        <p style={{"textAlign": `${type === MESSAGE.CUSTOMER ? "right" : "left"}`}}>
            <b>{type === MESSAGE.CUSTOMER ? "Customer" : "System"}:</b> {text} {icon}
        </p>
    )
}

function ChatBox({user, userHas}) {
    const DEFAULT_MESSAGE = {
        type: getSenderType(),
        status: 0,
        text: ""
    }
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(DEFAULT_MESSAGE);
    const [conversation, setConversation] = useState(null);

    const listenSocket = useCallback(() => {
        // Connect to user conversation
        let name = conversation ? conversation.name : `${user.email.split("@")[0]}-croom`;
        socket.emit("join", {
            name,
            user_id: userHas(CUSTOMER_PERMISSION) ? user._id : false
        });

        socket.on("new message", function(message) {
            setMessages(prev => prev.map(v => {
                return {
                    ...v,
                    status: v.status === 0 ? 1 : v.status
                }
            }))
        })

        socket.on("create conversation", function(conversationData){
            setConversation(conversationData);
        })
    }, [conversation, user._id, user.email, userHas]);

    useEffect(() => {
        listenSocket();
    }, [listenSocket])

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
    }, [load])

    function getSenderType() {
        return userHas(CUSTOMER_PERMISSION) ? MESSAGE.CUSTOMER : MESSAGE.SYSTEM
    }

    function submit(e) {
        e.preventDefault();
        let sentMessage = {
            ...message,
            conversation_id: conversation._id,
            createdAt: moment()
        };
        setMessages(prev => [...prev, sentMessage]);
        socket.emit("create", sentMessage);
        setMessage(DEFAULT_MESSAGE);
    }

    function hdChange(e) {
        const {value} = e.target;
        setMessage(prev => ({...prev, text: value}));
    }

    return (
        <div className="chat-box">
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
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

function mapState({user}) {
    return {
        user: user.data,
        userHas: isPermit(user.data.role.map(v => v.code))
    }
}

export default connect(mapState, null)(ChatBox);
