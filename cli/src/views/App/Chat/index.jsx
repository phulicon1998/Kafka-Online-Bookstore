import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer} from "antd";
import users from "./data/chatUsers";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import {apiCall} from "constants/apiCall";
import api from "constants/api";
import Communication from "./Communication";
import ChatUsers from "./ChatUsers";
import MESSAGE from "constants/messageTypes";
import moment from "moment";
import {
    isPermit,
    CUSTOMER_PERMISSION
} from "constants/credentialControl";
import {connect} from "react-redux";

import ioClient from "socket.io-client";
const socket = ioClient("localhost:8080");

function Chat({userHas, ...props}) {
    const DEFAULT_MESSAGE = {
        type: getSenderType(),
        status: 0,
        text: ""
    }
    // const [searchChatUser, setSearchChatUser] = useState("");
    // const [contacts, setContacts] = useState(users.filter((user) => !user.recent));
    // const [chats, setChats] = useState(users.filter((user) => user.recent));

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(DEFAULT_MESSAGE);
    const [conversation, setConversation] = useState(null);
    const [conversations, setConversations] = useState([]);

    // const [selectedUser, setSelectedUser] = useState(null);
    // const [selectedSectionId, setSelectedSectionId] = useState("");
    // const [conversations, setConversations] = useState(conversationList);
    const [drawerState, setDrawerState] = useState(false);
    // const [mode, setMode] = useState(MODE.CHAT);
    const [loader, setLoader] = useState(true);

    function getSenderType() {
        return userHas(CUSTOMER_PERMISSION) ? MESSAGE.CUSTOMER : MESSAGE.SYSTEM
    }

    const load = useCallback(async() => {
        let conversationList = await apiCall(...api.message.get());
        setConversations(conversationList);
        setLoader(false);
    }, []);

    useEffect(() => {
        load();
    }, [load])

    const listenSocket = useCallback(() => {
        let conversationName = "a";
        socket.emit("join", conversationName);

        socket.on("new message", function(message) {
            setMessages(prev => [...prev, message]);
        })
    }, [])

    useEffect(() => {
        listenSocket();
    }, [listenSocket])

    function updateMessageValue(e) {
        const {value} = e.target;
        setMessage(prev => ({
            ...prev,
            text: value
        }));
    }

    // function filterContact(userName) {
    //     if (userName === '') return users.filter(user => !user.recent);
    //     return users.filter((user) => !user.recent && user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1);
    // };
    //
    // function filterUsers(userName) {
    //     if (userName === '') return users.filter(user => user.recent);
    //     return users.filter(user => user.recent && user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1);
    // };

    // hd change search chat user
    // function updateSearchChatUser(e) {
    //     setSearchChatUser(e.target.value);
    //     setContacts(filterContact(e.target.value));
    //     setChats(filterUsers(e.target.value));
    // }

    function _handleKeyPress(e) {
        if (e.key === 'Enter') submitComment();
    };

    function submitComment() {
        if(message.text.length > 0) {
            let sentMessage = {...message, createdAt: moment()};
            socket.emit("create", sentMessage);
            setMessage(DEFAULT_MESSAGE);
        }
    }

    function onToggleDrawer() {
        setDrawerState(prev => !prev);
    }

    // function onSelectUser(user) {
    //     setLoader(true);
    //     setSelectedUser(user);
    //     setSelectedSectionId(user.id);
    //     setDrawerState(props.drawerState);
    //     setConversation(conversations.find(data => data.id === user.id));
    //     setTimeout(() => {
    //         setLoader(false);
    //     }, 1500);
    // };

    function showCommunication() {
        return (
            <div className="gx-chat-box">
                {
                    conversation === null
                    ? <div className="gx-comment-box">
                        <div className="gx-fs-80">
                            <i className="icon icon-chat gx-text-muted"/>
                        </div>
                        <h1 className="gx-text-muted">
                            { <IntlMessages id="chat.selectUserChat"/> }
                        </h1>
                        <Button
                            className="gx-d-block gx-d-lg-none"
                            type="primary"
                            onClick={onToggleDrawer}
                        >
                            {<IntlMessages id="chat.selectContactChat"/>}
                        </Button>

                    </div>
                    : <Communication
                        selectedUser={users[0]}
                        conversation={messages}
                        message={message}
                        // onToggleDrawer={onToggleDrawer}
                        _handleKeyPress={_handleKeyPress}
                        updateMessageValue={updateMessageValue}
                        submitComment={submitComment}
                    />
                }
            </div>
        )
    }

    return (
        <div className="gx-main-content">
            <div className="gx-app-module gx-chat-module">
                <div className="gx-chat-module-box">
                    <div className="gx-d-block gx-d-lg-none">
                        {/* <Drawer
                            placement="left"
                            closable={false}
                            visible={drawerState}
                            onClose={onToggleDrawer}>
                            <ChatUsers
                                contactList={contacts}
                                chatUsers={chats}
                                updateSearchChatUser={updateSearchChatUser}
                                searchChatUser={searchChatUser}
                                onSelectUser={onSelectUser}
                            />
                        </Drawer> */}
                    </div>
                    <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
                        <ChatUsers
                            // chatUsers={chats}
                            // contactList={contacts}
                            chatUsers={[]}
                            contactList={[]}
                            // updateSearchChatUser={updateSearchChatUser}
                            // searchChatUser={searchChatUser}
                            // onSelectUser={onSelectUser}
                        />
                    </div>
                    {
                        loader
                        ? <div className="gx-loader-view">
                            <CircularProgress/>
                        </div>
                        : showCommunication()
                    }
                </div>
            </div>
        </div>
    )
}

function mapState({user}) {
    return {
        user: user.data,
        userHas: isPermit(user.data.role.map(v => v.code))
    }
}

export default connect(mapState, null)(Chat);
