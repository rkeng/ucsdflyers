import React from 'react'
import { connect } from 'react-redux'
import { Glyphicon, Image } from 'react-bootstrap'
import { firebaseUI, uiConfig } from '../firebase/firebaseUI';
import triton from '../asset/logo.png'

class LoginForm extends React.Component {

  componentWillUnmount(){
    firebaseUI.reset();
  }

  render () {
    firebaseUI.start('#app', uiConfig)
    return (
        <div className="text-center">
              <h2><Glyphicon glyph="flash" /> Login to UCSDFlyer</h2>
              <Image src={triton} style={{width:120, height:120}} className='text-center'/>
        </div>
    )
  }
}

const Login = connect()(LoginForm)

export { Login }
