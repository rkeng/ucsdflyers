import React from 'react'
import { Org } from '../DumbComponents/Org'
import { fetchDataOn } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'

class OrgListContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      orgs: []
    }
  }

  componentWillMount () {
    const that = this;

    fetchDataOn('clubs')
    .then(function(clubs){
        console.log('what is the clubs?', clubs)
        var newOrgList = clubs.val()
        that.setState({
            orgs: newOrgList
        })
    })
    .catch(function(error){
        NotificationManager.error('Something is wrong', 'Opps!', 2222);
    })
  }

  render () {
    return (
        <div>
            <Org orgs={this.state.orgs}/>
            <NotificationContainer/>
        </div>
    )
  }
}

export {OrgListContainer}
