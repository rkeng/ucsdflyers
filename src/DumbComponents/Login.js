import React from 'react'
import { connect } from 'react-redux'
import { firebaseUI, uiConfig } from '../models/firebaseUI';

class LoginForm extends React.Component {

  componentWillUnmount(){
    firebaseUI.reset();
  }

  render () {
    firebaseUI.start('#app', uiConfig)
    return (
      <div> Login Page</div>
    )
  }
}

const Login = connect()(LoginForm)

export { Login }
