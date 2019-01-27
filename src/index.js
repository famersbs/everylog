import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'connected-react-router'
import { HashRouter } from 'react-router-dom'
import store, { history } from './store'
import App from './containers/app'

import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <HashRouter history={history}>
      <div>
        <App />
      </div>
    </HashRouter>
  </Provider>,
  target
)
