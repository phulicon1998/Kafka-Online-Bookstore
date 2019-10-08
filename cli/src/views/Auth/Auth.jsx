import React, {useState} from "react";
import {ModeButton, SocialButton} from "components/Auth/Button";
import AuthInput from "components/Auth/Input/AuthInput";
import withEffect from "hocs/Auth/withEffect";
import {connect} from "react-redux";
import {sendAuthData} from "appRedux/actions/user";
import {addMessage} from "appRedux/actions/message";

const fadeEff = {
    show: "authFadeIn",
    hide: "authFadeOut"
}

const switchBtnEff = {
    show: "btnWentIn",
    hide: "btnWentOut"
}

function AuthIntro({isMember, switchMode, changeMode}) {
    return (
        <div id="auth-intro">
            <h1><i className="fas fa-book"/> Kafka</h1>
            <p>Book for everyone</p>
            <ModeButton
                title={
                    isMember
                    ? "Don't have account? Want to be a member?"
                    : "Already have account? Login your account here:"
                }
                button={isMember ? "Join Us" : "Access Now"}
                modeCss={isMember ? "join" : "access"}
                swMode={switchMode}
                changeMode={changeMode}
                effs={fadeEff}
            />
            <p>Or login via social account</p>
            <div>
                <SocialButton
                    name="Facebook"
                    icon="fab fa-facebook-f"
                    color="#496b9c"
                />
                <SocialButton
                    name="Twitter"
                    icon="fab fa-twitter"
                    color="#4eb1ab"
                />
                <SocialButton
                    name="Google"
                    icon="fab fa-google"
                    color="#b74c2f"
                />
            </div>
        </div>
    )
}

const Title = ({isMember, swMode}) => (
    <h2 className={swMode}>
        {isMember ? "Login" : "Sign Up"}
    </h2>
);

const Subtitle = ({isMember, swMode}) => (
    <p className={swMode}>
        {
            isMember
            ? "Enter your username and password to log on"
            : "Enter required information below to register"
        }
    </p>
);

const Button = ({isMember, swMode, hdClick}) => {
    if(!isMember && swMode === "btnWentOut") swMode += " slowMove";
    return (
        <button
            className={`btn btn-primary ${isMember ? "signin" : "signup"} ${swMode}`}
            onClick={hdClick}
        >
            {isMember ? "Sign in" : "Register"}
        </button>
    )
}

const AnimateTitle = withEffect(Title);
const AnimateSubtitle = withEffect(Subtitle);
const AnimateButton = withEffect(Button);

function AuthForm({isMember, form, hdChange, switchMode, hdSubmit, error}) {
    return (
        <div id="auth-form">
            <div>
                <AnimateTitle
                    swMode={switchMode}
                    isMember={isMember}
                    effs={fadeEff}
                />
                <AnimateSubtitle
                    swMode={switchMode}
                    isMember={isMember}
                    effs={fadeEff}
                />
                <hr/>
                {error && error.content.length > 0 && <small>{error.content}</small>}
                <div>
                    <AuthInput
                        icon="fas fa-envelope"
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={hdChange}
                    />
                    <AuthInput
                        type="password"
                        icon="fas fa-key"
                        placeholder="Password"
                        name="password"
                        value={form.password}
                        onChange={hdChange}
                    />
                    {
                        isMember || <AuthInput
                            type="password"
                            icon="fas fa-key"
                            placeholder="Confirm Password"
                            name="cpassword"
                            value={form.cpassword}
                            onChange={hdChange}
                            hide={switchMode ? " exit" : ""}
                        />
                    }
                    {
                        isMember || <AuthInput
                            icon="fas fa-user"
                            placeholder="Your username"
                            name="username"
                            value={form.username}
                            onChange={hdChange}
                            hide={switchMode ? " exit" : ""}
                        />
                    }
                    <AnimateButton
                        isMember={isMember}
                        swMode={switchMode}
                        effs={switchBtnEff}
                        hdClick={hdSubmit}
                    />
                </div>
                <a href="/">Forgot your password?</a>
            </div>
        </div>
    )
}

const DEFAULT_FORM = {
    email: "",
    password: "",
    cpassword: "",
    username: ""
}

function Auth({sendAuthData, message, addMessage, ...props}) {
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
                />
                <AuthForm
                    form={form}
                    hdChange={hdChange}
                    isMember={isMember}
                    switchMode={switchMode}
                    hdSubmit={submit}
                    error={message}
                />
            </div>
        </div>
    )
}

function mapState({message}) {
    return {message};
}

export default connect(mapState, {sendAuthData, addMessage})(Auth);
