import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Login = props => (
  <div>
    Login
  </div>
)

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
