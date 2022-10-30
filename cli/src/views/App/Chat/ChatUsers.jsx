import React from "react";
import {Avatar, Tabs} from "antd";
import SearchBox from "components/SearchBox";
import CustomScrollbars from "util/CustomScrollbars";
import ConversationCell from "components/Shop/Cell/ConversationCell";

const TabPane = Tabs.TabPane;

const ConversationList = ({conversations, conversation, selectConversation}) => {
  return (
    <div className="gx-chat-user">
      {
        conversations.map((con, i) => (
          <ConversationCell
            {...con}
            selected={conversation._id === con.user_id._id || false}
            onSelect={() => selectConversation(con)}
            key={i}
          />
        ))
      }
    </div>
  )
};

const ChatUsers = ({searchCustomer, customer, selectConversation, conversation, ...state}) => (
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
          onChange={searchCustomer}
          value={customer}
        />
      </div>
    </div>
    <div className="gx-chat-sidenav-content">
      <Tabs className="gx-tabs-half" defaultActiveKey="2">
        <TabPane label="Handling" tab="Handling" key="1">
          <CustomScrollbars className="gx-chat-sidenav-scroll-tab-1">
            {
              state.handlers.length === 0
                ? <div className="gx-p-5">No user found</div>
                : <ConversationList
                  conversations={state.handlers}
                  conversation={conversation}
                  selectConversation={selectConversation}
                />
            }
          </CustomScrollbars>
        </TabPane>
        <TabPane label="Waiting" tab="Waiting" key="2">
          <CustomScrollbars className="gx-chat-sidenav-scroll-tab-1">
            {
              state.waiters.length === 0
                ? <div className="gx-p-5">No waiting message found.</div>
                : <ConversationList
                  conversations={state.waiters}
                  conversation={conversation}
                  selectConversation={selectConversation}
                />
            }
          </CustomScrollbars>
        </TabPane>
      </Tabs>
    </div>
  </div>
);

export default ChatUsers;
