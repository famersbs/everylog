import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { login } from "../../modules/auth";

import "./css.scss";

const Login = (props: { login: () => void }) => (
  <div className="login-bg">
    <div className="login-container">
      <div className="login-form">
        <span className="title">EVERY LOG</span>
        <span className="logo">
          <img src="/img/logo_login.jpg" alt="log" />
        </span>
        <span className="login">
          <button onClick={() => props.login()}>
            <img
              src="/img/btn_google_signin_light_normal_web.png"
              alt="login with google"
            />
          </button>
        </span>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  login: () => {
    dispatch(login());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
