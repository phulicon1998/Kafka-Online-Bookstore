import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {apiCall} from "constants/apiCall";
import api from "constants/api";
import {activateUser} from "appRedux/actions/user";

function Activate({activateUser, ...props}) {
    const [time, setTime] = useState(5);
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        if(isActivated) {
            let timeLeft = 4;
            let id = setInterval(() => {
                if(timeLeft === 0) {
                    activateUser();
                    clearInterval(id);
                    props.history.push("/");
                } else {
                    setTime(timeLeft);
                    timeLeft--;
                }
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActivated]);

    useEffect(() => {
        verify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function verify() {
        const {user_id} = props.match.params;
        try {
            let user = await apiCall(...api.user.getOne(user_id));
            if(!user.active) {
                await apiCall(...api.user.activate(user_id));
                setIsActivated(true);
            } else {
                return props.history.push("/");
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="activate">
            <div className="container">
                <i className="fas fa-users"></i>
                <h1>Your account has been activated</h1>
                <hr/>
                <h3>You are now a part of Kafka community, no more actions required. We wish you to have a good time using our system.</h3>
                <span>Redirect to homepage in {time} seconds...</span>
            </div>
        </div>
    )
}

export default connect(null, {activateUser})(Activate);
