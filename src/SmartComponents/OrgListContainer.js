import React from 'react'
import { Org } from '../DumbComponents/Org'
import { firebase } from '../models/FlyersFirebase'
import { NotificationContainer } from 'react-notifications'
import { connect } from 'react-redux'

var orgRef = firebase.database().ref('clubs/')

class OrgListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      orgs: []
    }
  }

  componentWillMount () {
    const that = this
        // define the dataHandler
    function dataHandler (data) {
      var newOrgList = data.val() // an array of all orgs
            // The 'this' below refers to the function itself,
            // but we want it to refer to the component OrgListContainer
      that.setState({
        orgs: newOrgList
      })
    }

        // define error handler
    function errorHandler (error) {
      console.log('error', error.code)
    }

        // call the database
    orgRef.on('value', dataHandler, errorHandler)

    /*
      use the fetchDataOn('...') method in the models:
      1. add:  import { fetchDataOn } from '../models'
      2. usage:
               fetchDataOn('clubs')
               .then(function(clubs){
                  ... //clubs is the array of all clubs
               })
    */
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

const OrgListContainer = connect()(OrgListContainerPage)

export { OrgListContainer }
