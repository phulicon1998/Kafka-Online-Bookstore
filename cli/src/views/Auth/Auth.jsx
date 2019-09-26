import React, {useState} from "react";

const SocialBtn = ({name, icon, color}) => (
    <button
        className="social-btn"
        style={{
            "backgroundColor": `${color}`,
            "borderColor": `${color}`
        }}
    >
        <i className={icon}/>
        <span>{name}</span>
    </button>
)

const AuthInput = ({icon, type, ...input}) => (
    <div className="auth-input">
        <i className={icon}/>
        <input type={type ? type : "text"} {...input}/>
    </div>
)

function Auth() {
    const [isMember, setIsMember] = useState(true);
    const [escapeMode, setEscapeMode] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        cpassword: "",
        username: ""
    })

    const changeMode = () => {
        // setEscapeMode(prev => !prev);
        // setTimeout(() => {
            setIsMember(prev => !prev);
        // }, 1000);
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
                <div id="intro">
                    <h1><i className="fas fa-book"/> Kafka</h1>
                    <p>Book for everyone</p>
                    <p>Don't have account? Want to be a member?</p>
                    <button
                        className={`${isMember ? "join" : "access"} ${escapeMode ? "reverse-appear" : ""}`}
                        onClick={changeMode}
                    >
                        {isMember ? "Join Us" : "Access Now"}
                    </button>
                    <p>Or login via social account</p>
                    <div>
                        <SocialBtn
                            name="Facebook"
                            icon="fab fa-facebook-f"
                            color="#496b9c"
                        />
                        <SocialBtn
                            name="Twitter"
                            icon="fab fa-twitter"
                            color="#4eb1ab"
                        />
                        <SocialBtn
                            name="Google"
                            icon="fab fa-google"
                            color="#b74c2f"
                        />
                    </div>
                </div>
                <div id="form">
                    <div>
                        <h2>Login</h2>
                        <p>Enter your username and password to log on.</p>
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
                                />
                            }
                            {
                                isMember || <AuthInput
                                    icon="fas fa-user"
                                    placeholder="Your username"
                                    name="username"
                                    value={form.username}
                                    onChange={hdChange}
                                />
                            }
                            <button className={`btn btn-primary ${isMember ? "signin" : "signup"}`}>
                                {isMember ? "Sign in" : "Register"}
                            </button>
                        </div>
                        <a href="/">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;
