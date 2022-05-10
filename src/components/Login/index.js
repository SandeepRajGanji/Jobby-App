import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

export default class Login extends Component {
  state = {
    errorMsg: false,
    showErrorMsg: '',
    username: '',
    password: '',
  }

  setUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  setPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  successResponse = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      path: '/',
      expires: 30,
    })
    history.replace('/')
  }

  failureResponse = errorMsg => {
    this.setState({
      errorMsg: true,
      showErrorMsg: errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const data = {
      username,
      password,
    }

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(apiUrl, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.status === 200) {
      this.successResponse(responseData.jwt_token)
    } else {
      this.failureResponse(responseData.error_msg)
    }
  }

  render() {
    const {errorMsg, showErrorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form onSubmit={this.onSubmitForm} className="form-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>

          <label htmlFor="username" className="label-text">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="input"
            onChange={this.setUsername}
            value={username}
          />
          <br />
          <label htmlFor="password" className="label-text">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="input"
            onChange={this.setPassword}
            value={password}
          />
          <br />
          <button type="submit" className="login">
            Login
          </button>
          <p>
            Username: rahul <br /> Password: rahul@2021
          </p>
          {errorMsg ? <p className="error-msg">*{showErrorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}
