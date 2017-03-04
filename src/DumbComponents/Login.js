import React from 'react'
import { connect } from 'react-redux'
import { Glyphicon } from 'react-bootstrap'
import { firebaseUI, uiConfig } from '../models/firebaseUI';
import { getCurrentUser } from '../models'
import { LoginStudentAction } from '../State/actions'

class LoginForm extends React.Component {

  componentWillUnmount(){
    const { dispatch } = this.props;
    getCurrentUser().then((user)=>{
      const userData = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          photoURL: user.photoURL,
          providerData: user.providerData,
          uid: user.uid,          
          isOrg: false
      }
      if(user)
        dispatch(LoginStudentAction(userData))
    })
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
