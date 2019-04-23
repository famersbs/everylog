import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Switch } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import store from "./store";
import App from "./containers/app";

import "sanitize.css/sanitize.css";
import "./scss/index.scss";

import { auth } from "./utils/fb";
import { setLoginStatus } from "./modules/auth";
import { loadSettings } from "./modules/settings";
import { watchCard } from "./modules/list";
import { AnyAction } from "redux";

const target = document.querySelector("#root");

// Auth check
const dispatch = store.dispatch as ThunkDispatch<{}, {}, AnyAction>;

auth().onAuthStateChanged(user => {
  let status: AUTH_STATUS = { isLogin: false };
  if (user) {
    status.isLogin = true;
    status.photoURL = user.photoURL;
    status.uid = user.uid;

    watchCard(user.uid)(store.dispatch, store.getState);
  } else {
    status.isLogin = false;
  }

  dispatch(setLoginStatus(status));
});

// Load Setting
dispatch(loadSettings());

render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <App />
      </Switch>
    </HashRouter>
  </Provider>,
  target
);
