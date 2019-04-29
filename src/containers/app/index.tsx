import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import List from "../list";
import Login from "../login";
import DetailView from "../detail_view";
import NowLoadingView from "../../component/nowloading";

const App = (props: { isLogin: boolean | null }) => {
  if (props.isLogin == null) {
    return <NowLoadingView />;
  } else if (props.isLogin === false) {
    return <Login />;
  }

  return (
    <div>
      <Route exact path="/" component={List} />
      <Route exact path="/detail_view" component={DetailView} />
    </div>
  );
};

const mapStateToProps = ({ auth }: { auth: AUTH_STATE }) => ({
  isLogin: auth.isLogin
});

export default connect(mapStateToProps)(App);
