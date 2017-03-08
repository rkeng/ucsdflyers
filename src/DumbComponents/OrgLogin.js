import React from 'react'
import { connect } from 'react-redux'
import { FaGooglePlusSquare, FaFacebookSquare } from 'react-icons/lib/fa'
import { Button } from 'react-bootstrap'
import { firebase } from '../models/FlyersFirebase'
import { signinOrg } from '../models'
import { getCurrentUser } from '../models'
import { LoginOrgAction } from '../State/actions'

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

class OrgLoginForm extends React.Component {
  constructor(props){
    super(props)
    this.onSignin=this.onSignin.bind(this)
  }

  ProviderSelect(id){
    var provider
    switch(id){
      case'org-google':
      provider = new firebase.auth.GoogleAuthProvider();
      break;
      case 'org-facebook':
      provider = new firebase.auth.FacebookAuthProvider();
      break;
      default:
      provider = null
    }
    return provider
  }

  onSignin(e){
    e.preventDefault();
    var provider = this.ProviderSelect(e.target.id)
    signinOrg(provider)
  }

  componentWillUnmount(){
    const { dispatch } = this.props;
    getCurrentUser().then((user) =>{
      if(user){
        const userData = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            photoURL: user.photoURL,
            providerData: user.providerData,
            uid: user.uid,
            likedFlyers: ' ',        
            isOrg: true
        }
        dispatch(LoginOrgAction(userData))
      }
    })
  }

  render () {
    return (
        <form className="text-center well" style={wellStyles}>
            <Button type='button' bsStyle='danger' block id='org-google' onClick={this.onSignin}><FaGooglePlusSquare size={30}/>Sign in with Google</Button>
            <Button type='button' bsStyle='info' block id='org-facebook' onClick={this.onSignin}><FaFacebookSquare size={30}/>Sign in with Facebook</Button>
        </form>
    )
  }
}

const OrgLogin = connect()(OrgLoginForm)

export { OrgLogin }
