import React from 'react'
import { firebase } from '../FlyersFirebase'

// iterate through an array of flyers to generate jsx for each flyer
function renderFlyers(flyers) {
    if (flyers.length > 0) {
        // map flyers to their index in firebase; call the index "key"
        return flyers.map((flyer, index) => (
            <Flyer key={index} flyer={flyer}/> 
        ))
    }
    else {
        return [];
    }
}

// individual flyer divs
// needed because React doesn't like to render objects on its own
const Flyer = ({flyer}) => {
    return (
        <div>
            Name: {flyer.name}<br/>
            Location: {flyer.location}<br/>
            Description: {flyer.description}<br/>
            Place: {flyer.date}
        </div>
    )
}

class FirebaseFetch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flyers: []
    }
  }
    
  // when component mounts, load from the database
  componentDidMount() {
      // get reference to 'flyers' array in firebase
      const flyersRef = firebase.database().ref().child('flyers')
      // fetch value of flyers
      flyersRef.on('value', snap => {
          var flyersArr = snap.val() // actual value of flyers
          
          this.setState({
              flyers: flyersArr
          })
      })
  }

  render () {
        // generate jsx for flyers using data in this.state.flyers (:4)
        var renderedFlyers = renderFlyers(this.state.flyers)
    return (
            <div className="container">
                <h1 className="page-header">Data:</h1>
        
                { renderedFlyers }
            </div>
    )
  }

}

export { FirebaseFetch }