import React, {useState} from "react";
import {ModeButton, SocialButton} from "components/Auth/Button";
import AuthInput from "components/Auth/Input/AuthInput";
import withEffect from "hocs/Auth/withEffect";

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

const Button = ({isMember, swMode}) => {
    if(!isMember && swMode === "btnWentOut") swMode += " slowMove";
    return (
        <button className={`btn btn-primary ${isMember ? "signin" : "signup"} ${swMode}`}>
            {isMember ? "Sign in" : "Register"}
        </button>
    )
}

const AnimateTitle = withEffect(Title);
const AnimateSubtitle = withEffect(Subtitle);
const AnimateButton = withEffect(Button);

function AuthForm({isMember, form, hdChange, switchMode}) {
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
                    />
                </div>
                <a href="/">Forgot your password?</a>
            </div>
        </div>
    )
}

function Auth() {
    const [isMember, setIsMember] = useState(true);
    const [switchMode, setSwitchMode] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        cpassword: "",
        username: ""
    })

    const changeMode = () => {
        setSwitchMode(prev => !prev);
        let time = isMember ? 800 : 1200;
        setTimeout(() => {
            setIsMember(prev => !prev);
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
                />
            </div>
        </div>
    )
}

export default Auth;
