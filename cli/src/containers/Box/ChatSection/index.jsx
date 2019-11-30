import React, {useState, useEffect, useCallback} from "react";
import {connect} from "react-redux";
import {
    isPermit,
    CUSTOMER_PERMISSION
} from "constants/credentialControl";
import {apiCall} from "constants/apiCall";
import api from "constants/api";
import {sentBy} from "constants/messageTypes";

import ChatBox from "./ChatBox";
import ChatButton from "./ChatButton";

import ioClient from "socket.io-client";
const socket = ioClient("localhost:8080");

function ChatSection({user, role}) {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState({});

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
        if(user._id) {
            let conversationData = await apiCall(...api.message.getOne(user._id));
            if(conversationData) {
                const {message_id, ...conversationInfo} = conversationData;
                setConversation(conversationInfo);
                setMessages(message_id);
            }
        }
    }, [user._id]);

    useEffect(() => {
        load();
        listenSocket();
        return () => socket.removeAllListeners();
    }, [load, listenSocket])

    function hdSubmit(message) {
        setMessages(prev => [...prev, message]);
        socket.emit("create message", message);
    }

    return (
        <div>
            <ChatButton toggle={setOpen} isOpen={open === true}/>
            {
                open && <ChatBox
                    user={user}
                    role={role}
                    toggle={setOpen}
                    hdSubmit={hdSubmit}
                    messages={messages}
                    conversation={conversation}
                />
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
