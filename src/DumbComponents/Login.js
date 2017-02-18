import React from 'react'
import { connect } from 'react-redux'
import { ui, uiConfig } from '../FlyersFirebase'

class LoginForm extends React.Component {

  componentWillUnmount(){
    ui.reset();
  }

  render () {
    ui.start('#app', uiConfig)
    return (
      <div> Login Page</div>
    )
  }
}


const Login = connect()(LoginForm)

export { Login }
