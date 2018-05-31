import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './reducer/rootReducer'


import {
  BrowserRouter as Router,
  Route,
  Link, withRouter
} from 'react-router-dom'

import { Login } from './src/login'

import { Tables } from './src'

class Root extends Component {

  state = {
    renderTabses: false,
    user: null
  }

  render() {
    const { user } = this.state
    console.log(user)
    return (<Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/table" component={Tables} />
        </div>
      </Router>
    </Provider >
    )
  }
}

export default Root