import React from "react";
import withEffect from "hocs/Auth/withEffect";
import AuthInput from "components/Auth/Input/AuthInput";

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
  if (!isMember && swMode === "btnWentOut") swMode += " slowMove";
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

function Form({isMember, form, hdChange, switchMode, hdSubmit, error, fadeEff, switchBtnEff}) {
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
        {
          error && error.content.length > 0 &&
          <small className={error.isNegative ? "error" : "success"}>{error.content}</small>
        }
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

export default Form;
