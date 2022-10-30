import React from "react";
import {Avatar, Input} from "antd";
import CustomScrollbars from "util/CustomScrollbars";

const AppUsersInfo = ({_handleKeyPress, updateMessageValue, message}) => (
  <div className="gx-chat-sidenav-main">
    <div className="gx-bg-grey-light gx-chat-sidenav-header">
      <div className="gx-chat-user-hd gx-mb-0">
        <i className="gx-icon-btn icon icon-arrow-left" onClick={() => {
          this.setState({userState: 1});
        }}/>

      </div>
      <div className="gx-chat-user gx-chat-user-center">
        <div className="gx-chat-avatar gx-mx-auto">
          <Avatar src='https://via.placeholder.com/150x150'
                  className="gx-size-60" alt="John Doe"/>
        </div>
        <div className="gx-user-name h4 gx-my-2">Robert Johnson</div>
      </div>
    </div>
    <div className="gx-chat-sidenav-content">
      <CustomScrollbars className="gx-chat-sidenav-scroll">
        <div className="gx-p-4">
          <form>
            <div className="gx-form-group gx-mt-4">
              <label>Mood</label>
              <Input
                fullWidth
                id="exampleTextarea"
                multiline
                rows={3}
                onKeyUp={_handleKeyPress}
                onChange={updateMessageValue}
                // defaultValue="it's a status....not your diary..."
                value={message}
                placeholder="Status"
                margin="none"
              />
            </div>
          </form>
        </div>
      </CustomScrollbars>
    </div>
  </div>
);

export default AppUsersInfo;
