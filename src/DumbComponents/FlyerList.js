import React from 'react'
import { Flyer } from './Flyer.js'

class FlyerList extends React.Component {
  
 // iterate through an array of flyers to generate jsx for each flyer
 renderFlyers () {
    if(this.props.flyers.length > 0){
        return this.props.flyers.map((flyer, index) =>
          (<Flyer key={index} flyer={flyer}/>)
      )
    }
    else{
      return [];
    }
  }

  render () {
    var renderedFlyers = this.renderFlyers();
    return (
        <div className='container'>
          <h1 className="page-header">Data:</h1>
            {renderedFlyers}
        </div>
    )
  }
}

FlyerList.propTypes = {
  flyers: React.PropTypes.array.isRequired
}

export { FlyerList }
