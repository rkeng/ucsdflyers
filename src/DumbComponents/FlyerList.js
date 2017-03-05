import React from 'react'
import { Flyer } from './Flyer.js'
import { ColCenter } from '../Commen'



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
        <ColCenter>
            {renderedFlyers}
        </ColCenter>
    )
  }
}

FlyerList.propTypes = {
  flyers: React.PropTypes.array.isRequired
}

export { FlyerList }