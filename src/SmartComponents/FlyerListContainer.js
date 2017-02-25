import React from 'react'
import { FlyerList } from '../DumbComponents/FlyerList'
import { connect } from 'react-redux'
import { fetchDataOn } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'

var flyersRef = firebase.database().ref('events/')

class FlyerListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      flyers: []
    }
  }

  componentWillMount () {
    const that = this;

    fetchDataOn('events')
    .then(function(events){
        var newFlyersList = events.val()
        that.setState({
            flyers: newFlyersList
        })
    })
    .catch(function(error){
        NotificationManager.error('Something is wrong', 'Opps!', 2222);
    })
  }

  render () {
    return (
        <div>
            <FlyerList flyers={this.state.flyers}/>
            <NotificationContainer/>
        </div>
    )
  }
}

const FlyerListContainer = connect()(FlyerListContainerPage)

export { FlyerListContainer }
