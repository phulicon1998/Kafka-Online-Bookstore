import React from "react";
import {notification} from "antd";

const DEFAULT_DESC = "There may be some errors occuring in the process. Please wait and try again later.";

export default function withNoti(WrappedComponent) {
    function Noti(props) {
        const openNotificationWithIcon = (type, message, description=DEFAULT_DESC) => {
            notification[type]({message, description});
        };

        return <WrappedComponent
            {...props}
            notify={openNotificationWithIcon}
        />
    }

    return Noti;
}
