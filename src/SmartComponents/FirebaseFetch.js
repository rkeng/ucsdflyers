import React from 'react'
import { firebase } from '../FlyersFirebase'

function renderFlyers(flyers) {
    if (flyers.length > 0) {
        return flyers.map((flyer, index) => (
            <Flyer key={index} flyer={flyer}/>
        ))
    }
    else {
        return [];
    }
}

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

//  componentWillMount () {
//    firebase.database().ref('flyers/').on('child_added', (flyer) => {
//      this.state.flyers.push(flyer)
//    })
//  }
    
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