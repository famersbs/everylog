import React from 'react'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import List from '../list'
import Login from '../login'
import DetailView from '../detail_view'

const App = (props) => {

  if ( props.isLogin == null ) {
    return (<div> Check Login </div>)
  } else if ( props.isLogin === false ) {
    return (<Login />)
  }

  return (
    <div>
      <Route exact path="/" component={List} />
      <Route exact path="/detail_view" component={DetailView} />
    </div>
  )
}

const mapStateToProps = ({auth}) => ({
  isLogin: auth.isLogin
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
)(App)

