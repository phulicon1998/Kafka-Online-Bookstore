import React from "react";
import {ModeButton, SocialButton} from "components/Auth/Button";
import GoogleLogin from "react-google-login";
import api from "constants/api";
import {apiCall} from "constants/apiCall";

function Intro({isMember, switchMode, changeMode, fadeEff}) {

    async function hdSuccess(response) {
        try {
            // Get data from google authenticate
            const {email, familyName, givenName, imageUrl} = response.profileObj;
            let user = {
                email,
                username: familyName + " " + givenName,
                avatar: {
                    link: imageUrl
                }
            }
            await apiCall(...api.user.social(), user);
            // clear cookie for logout
        } catch (e) {
            console.log(e);
        }
    }

    function hdFailure(res) {
        console.log(res);
    }

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
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_KEY}
                    render={renderProps => (
                        <SocialButton
                            name="Google"
                            icon="fab fa-google"
                            color="#b74c2f"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        />
                    )}
                    onSuccess={hdSuccess}
                    onFailure={hdFailure}
                />
            </div>
        </div>
    )
}

export default Intro;
