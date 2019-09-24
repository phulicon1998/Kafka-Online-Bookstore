import React from "react";

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
        <div className="form-group">
            <div className="input-group">
                <div className="input-group-addon">
                    <i className={icon}/>
                </div>
                <input type={type ? type : "text"} {...input}/>
            </div>
        </div>
    </div>
)

function Auth() {
    return (
        <div className="container">
            <div className="auth-content">
                <div id="intro">
                    <h1><i className="fas fa-book"/> Kafka</h1>
                    <p>Book for everyone</p>
                    <p>Don't have account? Want to be a member?</p>
                    <button>Join Us</button>
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
                <div id="form"> {/*content right appear*/}
                    <div>
                        <h2>Login</h2>
                        <p>Enter your username and password to log on.</p>
                        <hr/>
                        <div>
                            <AuthInput
                                icon="fas fa-envelope"
                                placeholder="Email"
                                name="email"
                            />
                            <AuthInput
                                type="password"
                                icon="fas fa-key"
                                placeholder="Password"
                                name="password"
                            />
                            {/* <AuthInput
                                type="password"
                                icon="fas fa-key"
                                placeholder="Password"
                                name="confirmPassword"
                            /> */}
                            <button className="btn btn-primary btn-block button-signup btnSignup-appear">Sign in</button>
                        </div>
                        <a href="/">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;
