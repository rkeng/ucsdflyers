import React from 'react'
import { FlyerList } from '../DumbComponents/FlyerList'
import { firebase } from '../FlyersFirebase'

const flyers = []

//get reference to "flyers" array in firebase
var flyersRef = firebase.database().ref('events/')

class FlyerListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flyers: []
    }
  }

  componentWillMount () {
    // define the dataHandler
    function dataHandler (data) {
      // an array of all flyers
      var newFlyersList = data.val() 

      this.setState({
        flyers: newFlyersList
      })
    }

    // This will make the "this" in above function refer to the component
    dataHandler = dataHandler.bind(this)

    // define error handler
    function errorHandler (error) {
      console.log('error', error.code)
    }

    // call the database
    flyersRef.on('value', dataHandler, errorHandler)     
  }

  render () {
    return (
            <FlyerList flyers={this.state.flyers}/>
    )   
  }
}

export { FlyerListContainer }
