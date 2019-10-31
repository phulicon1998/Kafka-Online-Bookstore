import React, {useState, useEffect, useCallback} from "react";
import {apiCall} from "constants/apiCall";
import {connect} from "react-redux";
import api from "constants/api";
import ioClient from "socket.io-client";

function Message({name, text, status, isView}) {
    let sttText = "sending..."
    if(status === 1) sttText = "sent";
    if(status === 2) sttText = "received";
    return <p><b>{name}:</b>{text} {isView || [{sttText}]}</p>
}

function ChatBox({user}) {
    const [msgs, setMsgs] = useState([]);
    const [message, setMessage] = useState("");

    const load = useCallback(async() => {
        let msgsData = await apiCall(...api.message.get(user._id));
        let msg = msgsData ? msgsData.message_id : [];
        setMsgs(msg);
    }, [setMsgs, user._id])

    useEffect(() => {
        load();
    }, [load])

    function submit(e) {
        e.preventDefault();

    }

    return (
        <div className="chat-box">
            <div>
                {
                    msgs.map((v, i) => (
                        <Message {...v} key={i}/>
                    ))
                }
            </div>
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={message}
                    placeholder="Enter something here to chat..."
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(ChatBox);
