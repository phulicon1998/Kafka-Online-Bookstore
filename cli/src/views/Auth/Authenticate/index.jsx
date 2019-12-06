import React, {useState} from "react";
import {connect} from "react-redux";
import {sendAuthData, sendSocialAuthData} from "appRedux/actions/user";
import {addMessage} from "appRedux/actions/message";

// Import views
import AuthIntro from "./Intro";
import AuthForm from "./Form";

const fadeEff = {
    show: "authFadeIn",
    hide: "authFadeOut"
}

const switchBtnEff = {
    show: "btnWentIn",
    hide: "btnWentOut"
}

const DEFAULT_FORM = {
    email: "",
    password: "",
    cpassword: "",
    username: ""
}

function Auth({sendAuthData, sendSocialAuthData, message, addMessage, ...props}) {
    const [isMember, setIsMember] = useState(true);
    const [switchMode, setSwitchMode] = useState(false);
    const [form, setForm] = useState(DEFAULT_FORM);

    const changeMode = () => {
        setSwitchMode(prev => !prev);
        let time = isMember ? 800 : 1200;
        setTimeout(() => {
            setIsMember(prev => !prev);
            addMessage();
            setSwitchMode(prev => !prev);
        }, time);
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function submit() {
        if(isMember) {
            sendAuthData("/login", form);
        } else {
            if(form.username.length === 0 || form.password !== form.cpassword) {
                return addMessage("Please correctly enter all required information to complete.");
            }
            sendAuthData("/signup", form);
        }
        setForm(DEFAULT_FORM);
    }

    return (
        <div className="container">
            <div className="auth-content">
                <AuthIntro
                    isMember={isMember}
                    switchMode={switchMode}
                    changeMode={changeMode}
                    fadeEff={fadeEff}
                    sendSocialAuthData={sendSocialAuthData}
                />
                <AuthForm
                    form={form}
                    hdChange={hdChange}
                    isMember={isMember}
                    switchMode={switchMode}
                    hdSubmit={submit}
                    error={message}
                    fadeEff={fadeEff}
                    switchBtnEff={switchBtnEff}
                />
            </div>
        </div>
    )
}

function mapState({message}) {
    return {message};
}

export default connect(mapState, {sendAuthData, sendSocialAuthData, addMessage})(Auth);
