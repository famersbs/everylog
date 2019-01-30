import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { login } from '../../modules/auth'

import './css.scss'

const Login = props => (
  <div className="login-bg">
    <div className="login-container">
      <div className="login-form">
        <span className="title" >
          EVERY LOG
        </span>
        <span className="logo">
          <img src="/img/logo_login.jpg" alt="log"/>
        </span>
        <span className="login">
          <button onClick={() => props.login()} >
            <img src="/img/btn_google_signin_light_normal_web.png" alt="login with google"/>
          </button>
        </span>
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
