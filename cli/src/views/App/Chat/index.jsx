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
    const [searchCustomer, setSearchCustomer] = useState("abc");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(DEFAULT_MESSAGE);
    const [conversation, setConversation] = useState({_id: null});
    const [waiterChat, setWaiterChat] = useState([]);
    const [handlerChat, setHandlerChat] = useState([]);
    const [drawerState, setDrawerState] = useState(false);
    const [loader, setLoader] = useState(true);

    function getSenderType() {
        return userHas(CUSTOMER_PERMISSION) ? MESSAGE.CUSTOMER : MESSAGE.SYSTEM
    }

    const load = useCallback(async() => {
        let waiterList = await apiCall(...api.message.get());
        setWaiterChat(waiterList);
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

    function filterUsers(userName) {
        if (userName === '') return users.filter(user => user.recent);
        return users.filter(user => user.recent && user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1);
    };

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

    function selectConversation(selectCon) {
        if(selectCon._id !== conversation._id) {
            setConversation(selectCon);
            setHandlerChat(prev => [selectCon, ...prev]);
            setWaiterChat(prev => prev.filter(d => d._id !== selectCon._id));
            setMessages(selectCon.message_id);
        }
    };

    function showCommunication() {
        return (
            <div className="gx-chat-box">
                {
                    conversation._id === null
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
                        selectedUser={conversation.user_id}
                        messages={messages}
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

    function hdSearch(e) {
        setSearchCustomer(e.target.value);
        // setContacts(filterContact(e.target.value));
        // setChats(filterUsers(e.target.value));
    }

    return (
        <div className="gx-main-content">
            <div className="gx-app-module gx-chat-module">
                <div className="gx-chat-module-box">
                    <div className="gx-d-block gx-d-lg-none">
                        <Drawer
                            placement="left"
                            closable={false}
                            visible={drawerState}
                            onClose={onToggleDrawer}>
                            <ChatUsers
                                waiters={waiterChat}
                                handlers={handlerChat}
                                searchCustomer={hdSearch}
                                customer={searchCustomer}
                                selectConversation={selectConversation}
                                conversation={conversation}
                            />
                        </Drawer>
                    </div>
                    <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
                        <ChatUsers
                            waiters={waiterChat}
                            handlers={handlerChat}
                            searchCustomer={hdSearch}
                            customer={searchCustomer}
                            selectConversation={selectConversation}
                            conversation={conversation}
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
