import React from 'react'

import { connect } from 'react-redux'

import { serverLogin, pingToken } from '../reducer/index'

import { withRouter } from 'react-router-dom'

export const Login = withRouter(connect(state => state)(class extends React.Component {

  state = {
    username: '',
    password: ''
  }

  componentWillMount() {
    const token = localStorage.getItem('token')
    const { history, dispatch } = this.props
    if (token) {
      dispatch(pingToken(token)).then(login => {
        if (login) {
          history.push('/table')
        } else {
          localStorage.clear()
        }
      })
    }
  }

  handleInput = (field) => ({ target: { value } }) => {
    console.log('HERE')
    this.setState({
      [field]: value
    })
  }

  handleLogin = () => {
    const { dispatch, history } = this.props
    const { username, password } = this.state
    !!username && !!password && dispatch(serverLogin(username, password)).then(login => {
      if (login) {
        history.push('/table')
      }
    })
  }

  render() {
    return (
      <div className="modal-wrapper" >
        <div className="modal">
          <h1>Вхід в систему</h1>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Ім'я користувача</label>
              <input className="form-control" placeholder="ім'я" onChange={this.handleInput('username')} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Пароль</label>
              <input type="password" className="form-control" placeholder="пароль" onChange={this.handleInput('password')} />
            </div>
            <button type="button" className="btn btn-primary" onClick={this.handleLogin}>Вхід</button>
          </form>
        </div>
      </div>
    )
  }
}))
