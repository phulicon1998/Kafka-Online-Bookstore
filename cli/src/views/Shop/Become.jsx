import React, {useState} from "react";
import {connect} from "react-redux";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import {sendReloadUser} from "appRedux/actions/user";

const DEFAULT_PROVIDER = {
    name: "",
    phone: "",
    email: ""
}

function Become({user, sendReloadUser, ...props}) {
    const [provider, setProvider] = useState(DEFAULT_PROVIDER);
    const [useUserEmail, setUseUserEmail] = useState(false);
    const [error, setError] = useState("");

    function hdChange(e) {
        const {name, value} = e.target;
        setProvider(prev => ({...prev, [name]: value}));
    }

    function getUserEmail() {
        setUseUserEmail(prev => !prev);
        setProvider(prev => ({...prev, email: useUserEmail ? "" : user.email}));
    }

    async function submit() {
        const {name, email, phone} = provider;
        let isFilled = name.length > 0 && email.length > 0 && phone.length > 0;
        if(isFilled) {
            try {
                await apiCall(...api.provider.create(user._id), provider);
                sendReloadUser(user._id);
            } catch(err) {
                setError("Oops, there are some troubles with the server. Please try again.");
            }
        } else {
            setError("Please fill in all required fields.");
        }
        setProvider(DEFAULT_PROVIDER);
    }

    return (
        <div className="become-seller">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Become a seller with Kafka</h1>
                        <p>Please fill in suitable information in the form below</p>
                        {
                            error.length > 0 && <div className="alert alert-danger" role="alert">{error}</div>
                        }
                        <div>
                            <div className="form-group">
                                <label htmlFor="provider-name">Provider's name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the name here..."
                                    id="provider-name"
                                    name="name"
                                    onChange={hdChange}
                                    value={provider.name}
                                />
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={useUserEmail}
                                        onChange={getUserEmail}
                                        id="use-email"
                                    />
                                    <label className="form-check-label" htmlFor="use-email">
                                        Use your current registered email
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="provider-email">Provider's email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the email here..."
                                    id="provider-email"
                                    name="email"
                                    onChange={hdChange}
                                    value={provider.email}
                                    disabled={useUserEmail}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="provider-phone">Provider's phone</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter the phone number here..."
                                    id="provider-phone"
                                    name="phone"
                                    onChange={hdChange}
                                    value={provider.phone}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={submit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapState({user}) {
    return {
        user: user.data
    }
}

export default connect(mapState, {sendReloadUser})(Become);
