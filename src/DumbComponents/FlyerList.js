import React from 'react'
import { Flyer } from './Flyer.js'
import Masonry from 'react-masonry-component'

class FlyerList extends React.Component {

   // iterate through an array of flyers to generate jsx for each flyer
   constructor(props){
      super(props)
      this.state={
         flyers:[]
      }
   }
   

  render () {
    // var renderedFlyers = this.renderFlyers();

    var flyersToRender = this.props.flyers.map((flyer, index) => <Flyer key={index} flyer={flyer} />)

    var masonryOptions = {
      transitionDuration: 300,
    };

    return (

          <Masonry
                className={'my-gallery-class'}
                options={masonryOptions}
                enableResizableChildren={true} 
                disableImagesLoaded={false}
                updateOnEachImageLoad={true}
          >
                 {flyersToRender}
          </Masonry>

    )
  }
}

FlyerList.propTypes = {
  flyers: React.PropTypes.array.isRequired
}

export { FlyerList }
