import React, {useState} from "react";
import {connect} from "react-redux";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import {sendReloadUser} from "appRedux/actions/user";
import bg from "assets/imgs/mainblog.jpg";

const DEFAULT_PROVIDER = {
  name: "",
  phone: "",
  email: ""
}

function Become({user, sendReloadUser, ...props}) {
  const [provider, setProvider] = useState(DEFAULT_PROVIDER);
  const [error, setError] = useState("");

  function hdChange(e) {
    const {name, value} = e.target;
    setProvider(prev => ({...prev, [name]: value}));
  }

  async function submit() {
    const {name, phone} = provider;
    let isFilled = name.length > 0 && phone.length > 0;
    if (isFilled) {
      try {
        await apiCall(...api.provider.create(user._id), {...provider, email: user.email});
        sendReloadUser(user._id);
      } catch (err) {
        setError("Oops, there are some troubles with the server. Please try again.");
      }
    } else {
      setError("Please fill in all required fields.");
    }
    setProvider(DEFAULT_PROVIDER);
  }

  return (
    <div className="become" style={{backgroundImage: `url(${bg})`}}>
      <div>
        <div>
          <div>
            <h1>Become a seller with Kafka</h1>
            <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisi dolor, rhoncus vel dolor quis,
              congue ultricies tellus. Donec eget sagittis nulla. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Fusce id eleifend leo, a gravida felis</p>
            <p>Vestibulum varius tortor viverra, sollicitudin leo nec, facilisis massa. Fusce egestas sed est vel
              viverra. Ut porta ut urna eu pulvinar. Praesent ultricies neque at dapibus posuere. Aliquam interdum purus
              magna, ut tincidunt dolor eleifend ut. Aenean vitae feugiat odio. Sed varius orci velit, id varius nisl
              ultrices eu.</p>
          </div>
          <div>
            <h1>Establish Provider's Profile</h1>
            <p>Please fill in suitable information in the form below</p>
            {
              error.length > 0 && <div className="alert alert-danger" role="alert">{error}</div>
            }
            <div>
              <div className="form-group">
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
              <button className="btn btn-primary" onClick={submit}>Submit Information</button>
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
