import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Switch } from 'react-router-dom'
import store, { history } from './store'
import App from './containers/app'

import 'sanitize.css/sanitize.css'
import './scss/index.scss'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <HashRouter history={history}>
        <Switch>
            <App />
        </Switch>
    </HashRouter>
  </Provider>,
  target
)

