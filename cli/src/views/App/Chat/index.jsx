import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer} from "antd";
import CircularProgress from "components/CircularProgress/index";
import {apiCall} from "constants/apiCall";
import api from "constants/api";
import Communication from "./Communication";
import ChatUsers from "./ChatUsers";
import {sentBy} from "constants/messageTypes";
import moment from "moment";
import {
  isPermit,
  CUSTOMER_PERMISSION
} from "constants/credentialControl";
import {connect} from "react-redux";
// import ioClient from "socket.io-client";

// const socket = ioClient("localhost:8080");
const DEFAULT_CONVERSATION = {_id: null}

function Chat({role, ...props}) {
  const DEFAULT_MESSAGE = {
    type: role.isCustomer ? sentBy.CUSTOMER : sentBy.SYSTEM,
    status: 0,
    text: ""
  }
  const [searchCustomer, setSearchCustomer] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [conversation, setConversation] = useState(DEFAULT_CONVERSATION);
  const [waiterChat, setWaiterChat] = useState([]);
  const [handlerChat, setHandlerChat] = useState([]);
  const [drawerState, setDrawerState] = useState(false);
  const [loader, setLoader] = useState(true);

  // const listenSocket = useCallback(() => {
  //     socket.emit("control chat app");
  //
  //     socket.on("new waiter", function(waiter) {
  //         setWaiterChat(prev => [waiter, ...prev]);
  //     })
  //
  //     socket.on("remove waiter", function(waiter) {
  //         setWaiterChat(prev => prev.filter(c => c._id !== waiter._id));
  //     })
  // }, []);

  const load = useCallback(async () => {
    let waiterList = await apiCall(...api.message.get());
    setWaiterChat(waiterList);
    setLoader(false);
  }, []);

  useEffect(() => {
    load();
    // listenSocket();
    // return () => socket.removeAllListeners();
  }, [load])

  function hdChangeMessage(e) {
    const {value} = e.target;
    setMessage(prev => ({...prev, text: value}));
  }

  // function filterUsers(userName) {
  //     if (userName === '') return users.filter(user => user.recent);
  //     return users.filter(user => user.recent && user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1);
  // };

  function _handleKeyPress(e) {
    if (e.key === 'Enter') submitComment();
  };

  function submitComment() {
    if (message.text.length > 0) {
      let sentMessage = {
        ...message,
        conversation_id: conversation._id,
        createdAt: moment()
      };
      // socket.emit("create message", sentMessage);
      setMessage(DEFAULT_MESSAGE);
    }
  }

  function hdSelectWaiter(selectCon) {
    if (selectCon._id !== conversation._id) {
      setConversation(selectCon);
      setHandlerChat(prev => [selectCon, ...prev]);
      setWaiterChat(prev => prev.filter(d => d._id !== selectCon._id));
      setMessages(selectCon.message_id);

      // socket.emit("select waiter", selectCon);

      // socket.emit("salestaff join", selectCon);

      // socket.on("new message", function(message) {
      //     setMessages(prev => [...prev, message]);
      // })
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
              <h1 className="gx-text-muted">Select User to start Chat</h1>
              <Button
                className="gx-d-block gx-d-lg-none"
                type="primary"
                onClick={() => setDrawerState(prev => !prev)}
              >
                Select Contact to start Chat
              </Button>
            </div>
            : <Communication
              selectedUser={conversation.user_id}
              messages={messages}
              message={message}
              onToggleDrawer={() => setDrawerState(prev => !prev)}
              _handleKeyPress={_handleKeyPress}
              updateMessageValue={hdChangeMessage}
              submitComment={submitComment}
              leaveChat={leaveChat}
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

  function leaveChat(complete = false) {
    setHandlerChat(prev => prev.filter(c => c._id !== conversation._id));
    setConversation(DEFAULT_CONVERSATION);
    // if(!complete) {
    //     socket.emit("leave handler", conversation);
    // } else {
    //     socket.emit("complete conversation", conversation);
    // }
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
              onClose={() => setDrawerState(prev => !prev)}>
              <ChatUsers
                waiters={waiterChat}
                handlers={handlerChat}
                searchCustomer={hdSearch}
                customer={searchCustomer}
                selectConversation={hdSelectWaiter}
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
              selectConversation={hdSelectWaiter}
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
    role: {
      isCustomer: isPermit(user.data.role)(CUSTOMER_PERMISSION)
    }
  }
}

export default connect(mapState, null)(Chat);
