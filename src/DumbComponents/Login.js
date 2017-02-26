import React from 'react'
import { connect } from 'react-redux'
import { Glyphicon } from 'react-bootstrap'
import { firebaseUI, uiConfig } from '../models/firebaseUI';

class LoginForm extends React.Component {

  componentWillUnmount(){
    firebaseUI.reset();
  }

  render () {
    firebaseUI.start('#app', uiConfig)
    return (
        <div className="text-center">
            <div>
                <Glyphicon glyph="flash" />
                Login to UCSDFlyer
            </div>
        </div>
    )
  }
}

const Login = connect()(LoginForm)

export { Login }
