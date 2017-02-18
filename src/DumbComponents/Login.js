import React from 'react'
import { Notification } from 'react-notifications'
import { connect } from 'react-redux'
import { firebase, ui, uiConfig } from '../FlyersFirebase'

class LoginForm extends React.Component {

  componentWillUnmount(){
    ui.reset();
  }

  render () {
    ui.start('#app', uiConfig);
    return (
      <div> Login Page</div>
    )
  }
}


const Login = connect()(LoginForm)

export { Login }
