import React, {useState, useEffect, useCallback} from "react";
// import {Button, Drawer} from "antd";
// import Moment from "moment";

// import conversationList from "./data/conversationList";
import users from "./data/chatUsers";
// import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";

import Communication from "./Communication";
// import AppUsersInfo from "./AppUsersInfo";
import ChatUsers from "./ChatUsers";
import ioClient from "socket.io-client";
const socket = ioClient("localhost:8080");

// const MODE = {
//     CHAT: 1,
//     CONTACT: 2
// }

export default function Chat(props) {
    // const [searchChatUser, setSearchChatUser] = useState("");
    // const [contacts, setContacts] = useState(users.filter((user) => !user.recent));
    // const [chats, setChats] = useState(users.filter((user) => user.recent));

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState({
        _id: false,
        status: 0,
        text: ""
    });
    const [conversation, setConversation] = useState(null);

    // const [selectedUser, setSelectedUser] = useState(null);
    // const [selectedSectionId, setSelectedSectionId] = useState("");
    // const [message, setMessage] = useState({
    //     type: "sent",
    //     message: "",
    //     sentAt: Moment().format('hh:mm:ss A')
    // });
    // const [conversations, setConversations] = useState(conversationList);
    // const [conversation, setConversation] = useState(null);
    // const [drawerState, setDrawerState] = useState(false);
    // const [mode, setMode] = useState(MODE.CHAT);
    const [loader, setLoader] = useState(false);

    const listenSocket = useCallback(() => {
        let conversationName = "a";
        socket.emit("join", conversationName);

        socket.on("new message", function(message) {
            console.log(message);
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
        // if (message.message.length > 0) {
        //     // Create the message
        //     let sentMessage = {
        //         ...message,
        //         sentAt: Moment().format('hh:mm:ss A')
        //     }
        //
        //     // Create the updated conversations
        //     let updatedConversationData = [
        //         ...conversation.conversationData,
        //         sentMessage
        //     ]
        //
        //     // Update the current conversations
        //     setConversation(prev => ({
        //         ...prev,
        //         conversationData: updatedConversationData
        //     }))
        //
        //     setConversations(conversations.map(convers => {
        //         if (convers.id === conversation.id) {
        //             return {...conversation, conversationData: updatedConversationData};
        //         } else {
        //             return convers;
        //         }
        //     }))
        //     setMessage("");
        // }
        if(message.text.length > 0) {

        }
    }

    // function onToggleDrawer() {
    //     setDrawerState(prev => !prev);
    // }

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
                {/* {
                    selectedUser === null
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
                        selectedUser={selectedUser}
                        conversation={conversation}
                        message={message.messsage}
                        // onToggleDrawer={onToggleDrawer}
                        _handleKeyPress={_handleKeyPress}
                        updateMessageValue={updateMessageValue}
                        submitComment={submitComment}
                    />
                } */}
                <Communication
                    selectedUser={users[0]}
                    conversation={messages}
                    message={message.text}
                    // onToggleDrawer={onToggleDrawer}
                    _handleKeyPress={_handleKeyPress}
                    updateMessageValue={updateMessageValue}
                    submitComment={submitComment}
                />
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
