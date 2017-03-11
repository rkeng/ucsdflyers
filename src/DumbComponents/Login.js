import React from 'react'
import { connect } from 'react-redux'
import { Glyphicon } from 'react-bootstrap'
import { firebaseUI, uiConfig } from '../models/firebaseUI';
import { getCurrentUser, fetchDataOn, listenToData } from '../models'
import { LoginUserAction, UserDataUpdateAction } from '../State/actions'

class LoginForm extends React.Component {

  componentWillUnmount(){
    const { dispatch } = this.props;

    getCurrentUser().then((user)=>{
      if(user){
        listenToData(`users/${user.uid}`, function(userData){
            dispatch(UserDataUpdateAction(userData))
        })

        fetchDataOn(`users/${user.uid}`)
        .then(snap => {
            var userData = snap.val()
            const userDataOnAuth = {
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                photoURL: user.photoURL,
                providerData: user.providerData,
                uid: user.uid,
            }
            var userDataToState = Object.assign(userDataOnAuth, userData)
            dispatch(LoginUserAction(userDataToState))
        })
      }
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
