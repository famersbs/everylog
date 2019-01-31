import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Switch } from 'react-router-dom'
import store from './store'
import App from './containers/app'

import 'sanitize.css/sanitize.css'
import './scss/index.scss'

import { auth } from './utils/fb'
import { setLoginStatus } from './modules/auth'
import { watchCard } from './modules/list'

const target = document.querySelector('#root')

// Auth check
auth()
  .onAuthStateChanged( user => {
    let status = {}
    if(user){
      status.isLogin = true
      status.photoURL = user.photoURL
      status.uid = user.uid

      watchCard(user.uid)(store.dispatch, store.getState)

    } else {
      status.isLogin = false
    }

    store.dispatch(setLoginStatus(status))

  })

render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <App />
      </Switch>
    </HashRouter>
  </Provider>,
  target
)

