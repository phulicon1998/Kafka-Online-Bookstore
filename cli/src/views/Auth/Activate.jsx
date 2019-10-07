import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {apiCall} from "constants/apiCall";
import api from "constants/api";
import {activateUser} from "appRedux/actions/user";

function Activate({activateUser, ...props}) {
    const [time, setTime] = useState(4);
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        if(isActivated) {
            let id = setTimeout(() => {
                if(time === 0) {
                    activateUser();
                }
                setTime(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(id);
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
            let user = await apiCall("get", api.user.getOne(user_id));
            if(!user.active) {
                await apiCall("put", api.user.activate(user_id));
                setIsActivated(true);
            } else {
                return props.history.push("/");
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Your account has been activated. Return to homepage in {time+1} seconds...</h1>
        </div>
    )
}

export default connect(null, {activateUser})(Activate);
