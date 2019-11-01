import React, {useState, useEffect, useCallback} from "react";
import {apiCall} from "constants/apiCall";
import {connect} from "react-redux";
import api from "constants/api";
import ioClient from "socket.io-client";
import moment from "moment";

const socket = ioClient("localhost:8080");

function Message({name="unknow", text, status, isView}) {
    let sttText = "sending..."
    if(status === 1) sttText = "sent";
    if(status === 2) sttText = "received";
    return <p><b>{name}:</b>{text} {isView || `| ${sttText}`}</p>
}

function ChatBox({user}) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState({
        _id: false,
        status: 0,
        text: ""
    });
    const [conversation, setConversation] = useState(null);

    const listenSocket = useCallback(() => {
        // let conversationName = conversation ? conversation.name : `${user.email.split("@")[0]}-croom`;
        let conversationName = "a";
        socket.emit("join", conversationName);

        socket.on("new message", function(message) {

        })

    }, [conversation, user.email]);

    useEffect(() => {
        listenSocket();
    }, [listenSocket])

    const load = useCallback(async() => {
        let conversationData = await apiCall(...api.message.get(user._id));
        if(conversationData) {
            const {message_id, ...conversationInfo} = conversationData;
            setConversation(conversationInfo);
            setMessages(message_id);
        }
    }, [setMessages, user._id]);

    useEffect(() => {
        load();
    }, [load])

    function submit(e) {
        e.preventDefault();
        let sentMessage = {...message, createdAt: moment()};
        setMessages(prev => [...prev, sentMessage]);
        socket.emit("create", sentMessage);
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
    return {user: user.data}
}

export default connect(mapState, null)(ChatBox);
