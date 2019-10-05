import React, {useState} from "react";
import {Popconfirm} from "antd";

function PopConfirm({task, ...props}) {
    const [popConfirm, setPopConfirm] = useState(false);

    const hdCancel = () => setPopConfirm(false);

    const hdVisibleChange = () => setPopConfirm(prev => !prev);

    return (
        <Popconfirm
            visible={popConfirm}
            onVisibleChange={hdVisibleChange}
            onCancel={hdCancel}
            onConfirm={task}
            {...props}
        >
            {props.children}
        </Popconfirm>
    )
}

export default PopConfirm;
