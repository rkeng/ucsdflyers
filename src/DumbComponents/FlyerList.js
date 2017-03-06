import React from 'react'
import { Flyer } from './Flyer.js'
//import { ColCenter } from '../Commen'
import Masonry from 'react-masonry-component'
import RED from '../asset/RED.jpg'
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

    var masonryOptions = {
    transitionDuration: 0
  };
  
  var style = {
    backgroundColor: 'tomato'

  };



    return (
        //<div>
          <Masonry
                className={'my-gallery-class'} 
                options={masonryOptions}  
                style={style}

            >
                 {renderedFlyers}
          </Masonry>
        //</div>
    )
  }
}

FlyerList.propTypes = {
  flyers: React.PropTypes.array.isRequired
}

export { FlyerList }