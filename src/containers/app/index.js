import React from 'react'
import { Route } from 'react-router-dom'
import List from '../list'
import Login from '../login'
import DetailView from '../detail_view'

const App = () => (
  <div>
    {/*
    <header>
      <Link to="/">List</Link>
      <Link to="/login">Login</Link>
    </header>

    <main>
      <Route exact path="/" component={List} />
      <Route exact path="/login" component={Login} />
    </main>
     */}
    <Route exact path="/" component={List} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/detail_view" component={DetailView} />
  </div>
)

export default App
