import React, {Component} from "react";
import {Button, Drawer} from "antd";
import Moment from "moment";

import conversationList from "./data/conversationList";
import users from "./data/chatUsers";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";

import Communication from "./Communication";
import AppUsersInfo from "./AppUsersInfo";
import ChatUsers from "./ChatUsers";


class Chat extends Component {
    constructor() {
        super();
        this.state = {
            loader: false,
            userNotFound: 'No user found',
            drawerState: false,
            selectedSectionId: '',
            selectedTabIndex: 1,
            userState: 1,
            searchChatUser: '',
            contactList: users.filter((user) => !user.recent),
            selectedUser: null,
            message: '',
            chatUsers: users.filter((user) => user.recent),
            conversationList: conversationList,
            conversation: null
        }
    }


    filterContact = userName => {
        if (userName === '') return users.filter(user => !user.recent);
        return users.filter((user) => !user.recent && user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1);
    };


    filterUsers = userName => {
        if (userName === '') return users.filter(user => user.recent);
        return users.filter(user => user.recent && user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1);
    };

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.submitComment();
        }
    };

    handleChange = (event, value) => {
        this.setState({selectedTabIndex: value});
    };

    handleChangeIndex = index => {
        this.setState({selectedTabIndex: index});
    };

    onSelectUser = (user) => {
        this.setState({
            loader: true,
            selectedSectionId: user.id,
            drawerState: this.props.drawerState,
            selectedUser: user,
            conversation: this.state.conversationList.find((data) => data.id === user.id)
        });
        setTimeout(() => {
            this.setState({loader: false});
        }, 1500);
    };

    showCommunication = () => {
        return (
            <div className="gx-chat-box">
                {
                    this.state.selectedUser === null
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
                            onClick={this.onToggleDrawer.bind(this)}
                        >
                            {<IntlMessages id="chat.selectContactChat"/>}
                        </Button>

                    </div>
                    : <Communication
                        {...this.state}
                        onToggleDrawer={this.onToggleDrawer}
                        _handleKeyPress={this._handleKeyPress}
                        updateMessageValue={this.updateMessageValue}
                        submitComment={this.submitComment}
                    />
                }
            </div>
        )
    };

    submitComment() {
        if (this.state.message !== '') {
            const updatedConversation = this.state.conversation.conversationData.concat({
                'type': 'sent',
                'message': this.state.message,
                'sentAt': Moment().format('hh:mm:ss A'),
            });
            this.setState({
                conversation: {
                    ...this.state.conversation, conversationData: updatedConversation
                },
                message: '',
                conversationList: this.state.conversationList.map(conversationData => {
                    if (conversationData.id === this.state.conversation.id) {
                        return {...this.state.conversation, conversationData: updatedConversation};
                    } else {
                        return conversationData;
                    }
                })
            });
        }
    }

    updateMessageValue(evt) {
        this.setState({
            message: evt.target.value
        });
    }

    updateSearchChatUser(evt) {
        this.setState({
            searchChatUser: evt.target.value,
            contactList: this.filterContact(evt.target.value),
            chatUsers: this.filterUsers(evt.target.value)
        });
    }

    onToggleDrawer() {
        this.setState({
            drawerState: !this.state.drawerState
        });
    }

    render() {
        const {loader, userState, drawerState} = this.state;
        return (
            <div className="gx-main-content">
                <div className="gx-app-module gx-chat-module">
                    <div className="gx-chat-module-box">
                        <div className="gx-d-block gx-d-lg-none">
                            <Drawer
                                placement="left"
                                closable={false}
                                visible={drawerState}
                                onClose={this.onToggleDrawer.bind(this)}>
                                {
                                    userState === 1
                                    ? <ChatUsers
                                        {...this.state}
                                        updateSearchChatUser={this.updateSearchChatUser}
                                        searchChatUser={this.searchChatUser}
                                        onSelectUser={this.onSelectUser}
                                    />
                                    : <AppUsersInfo
                                        _handleKeyPress={this._handleKeyPress}
                                        updateMessageValue={this.updateMessageValue}
                                    />
                                }
                            </Drawer>
                        </div>
                        <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
                            {
                                userState === 1
                                ? <ChatUsers
                                    {...this.state}
                                    updateSearchChatUser={this.updateSearchChatUser}
                                    searchChatUser={this.searchChatUser}
                                    onSelectUser={this.onSelectUser}
                                />
                                : <AppUsersInfo
                                    _handleKeyPress={this._handleKeyPress}
                                    updateMessageValue={this.updateMessageValue}
                                />
                            }
                        </div>
                        {
                            loader
                            ? <div className="gx-loader-view">
                                <CircularProgress/>
                            </div>
                            : this.showCommunication()
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;
