import React from 'react'
import { connect } from 'react-redux'
import { Glyphicon} from 'react-bootstrap'
import { ui, uiConfig } from '../FlyersFirebase'

class LoginForm extends React.Component {

  componentWillUnmount(){
    ui.reset();
  }

  render () {
    ui.start('#app', uiConfig)

    return (
      <div className="text-center">
        <div className="well">
          <Glyphicon glyph="flash" />
          Login to UCSDFlyer
        </div>
      </div>
    )
  }
}

const Login = connect()(LoginForm)

export { Login }
