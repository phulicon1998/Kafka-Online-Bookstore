import React, {useState, useEffect, useCallback} from "react";
import {apiCall} from "constants/apiCall";

function ChatBox() {
    const {msgs, setMsgs} = useState([]);
    const [message, setMessage] = useState("");

    const load = useCallback(() => {
        // let msgsData = await apiCall(...api.)
    })

    useEffect(() => {

    }, [load])

    return (
        <div className="chat-box">
            <div>
                {
                    msgs.map((v, i) => (
                        <p><b>{v.name}:</b>{v.text}</p>
                    ))
                }
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button>Send</button>
        </div>
    )
}
