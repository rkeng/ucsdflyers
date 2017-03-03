import React from 'react'
//import Avatar from 'react-avatar'
//import { getCurrentUser } from '../models'
//import { NotificationContainer, NotificationManager } from 'react-notifications'

class userAvatar extends React.Component {
  /*
  constructor (props) {
    super(props)
    this.state = {
      source: ""
    }
  }

  getSource (){
    getCurrentUser()
    .then(function(user){
      var photoSource = user['photoURL']
      this.setState({
        source: photoSource
      })
    })
    .catch(function(error){
        NotificationManager.error('Something is wrong', 'Opps!', 2222);
    })
  }
  */
  render (){
    return (
      //<Avatar round={true} size={30} />
      <div>test</div>
    )
  }
}
/*
userAvatar.propTypes = {
  source: React.PropTypes.string.isRequired
}
*/

export { userAvatar }
