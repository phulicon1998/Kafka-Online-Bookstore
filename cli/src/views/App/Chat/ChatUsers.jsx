import React from "react";
import {Avatar, Tabs} from "antd";
import SearchBox from "components/SearchBox";
import IntlMessages from "util/IntlMessages";
import CustomScrollbars from "util/CustomScrollbars";
import ContactList from "components/chat/ContactList/index";
import ChatUserList from "components/chat/ChatUserList";

const TabPane = Tabs.TabPane;

const ChatUsers = ({updateSearchChatUser, searchChatUser, onSelectUser, ...state}) => (
    <div className="gx-chat-sidenav-main">

        <div className="gx-chat-sidenav-header">
            <div className="gx-chat-user-hd">
                <div className="gx-chat-avatar gx-mr-3">
                    <div className="gx-status-pos">
                        <Avatar
                            id="avatar-button"
                            src='https://via.placeholder.com/150x150'
                            className="gx-size-50"
                            alt=""
                        />
                        <span className="gx-status gx-online"/>
                    </div>
                </div>

                <div className="gx-module-user-info gx-flex-column gx-justify-content-center">
                    <div className="gx-module-title">
                        <h5 className="gx-mb-0">Robert Johnson</h5>
                    </div>
                    <div className="gx-module-user-detail">
                        <span className="gx-text-grey gx-link">robert@example.com</span>
                    </div>
                </div>
            </div>

            <div className="gx-chat-search-wrapper">
                <SearchBox
                    styleName="gx-chat-search-bar gx-lt-icon-search-bar-lg"
                    placeholder="Search or start new chat"
                    onChange={updateSearchChatUser}
                    value={searchChatUser}
                />
            </div>
        </div>

        <div className="gx-chat-sidenav-content">
            {/*<AppBar position="static" className="no-shadow chat-tabs-header">*/}
            <Tabs className="gx-tabs-half" defaultActiveKey="1">
                <TabPane label={<IntlMessages id="chat.chatUser"/>} tab={<IntlMessages id="chat.chatUser"/>} key="1">
                    <CustomScrollbars className="gx-chat-sidenav-scroll-tab-1">
                        {
                            state.chatUsers.length === 0
                            ? <div className="gx-p-5">{state.userNotFound}</div>
                            : <ChatUserList
                                chatUsers={state.chatUsers}
                                selectedSectionId={state.selectedSectionId}
                                onSelectUser={onSelectUser}
                            />
                        }
                    </CustomScrollbars>
                </TabPane>
                <TabPane label={<IntlMessages id="chat.contacts"/>} tab={<IntlMessages id="chat.contacts"/>} key="2">
                    <CustomScrollbars className="gx-chat-sidenav-scroll-tab-2">
                        {
                            state.contactList.length === 0
                            ? <div className="gx-p-5">{state.userNotFound}</div>
                            : <ContactList
                                contactList={state.contactList}
                                selectedSectionId={state.selectedSectionId}
                                onSelectUser={onSelectUser}
                            />
                        }
                    </CustomScrollbars>
                </TabPane>
            </Tabs>


        </div>
    </div>
);

export default ChatUsers;
