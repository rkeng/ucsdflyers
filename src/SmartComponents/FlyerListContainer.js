import React from 'react'
import { FlyerList } from '../DumbComponents/FlyerList'
import { firebase } from '../models/FlyersFirebase'
import { connect } from 'react-redux'

var flyersRef = firebase.database().ref('events')

class FlyerListContainerPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flyers: []
    }
  }

  componentWillMount () {
    const that = this
    // define the dataHandler
    function dataHandler (data) {
      // an array of all flyers
      var newFlyersList = data.val() 

      that.setState({
        flyers: newFlyersList
      })
    }

    // define error handler
    function errorHandler (error) {
      console.log('error', error.code)
    }

    // call the database
    flyersRef.on('value', dataHandler, errorHandler)     

    /*
      use the fetchDataOn('...') method in the models:
      1. add:  import { fetchDataOn } from '../models'
      2. usage:
               fetchDataOn('events')
               .then(function(events){
                  ... //events is the array of all flyers
               })
    */
  }

  render () {
    return (
            <FlyerList flyers={this.state.flyers}/>
    )
  }
}

const FlyerListContainer = connect()(FlyerListContainerPage)

export { FlyerListContainer }
