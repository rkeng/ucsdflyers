import React from 'react'
import { Col } from 'react-bootstrap'
import { Flyer } from './Flyer.js'
import Masonry from 'react-masonry-component'

class FlyerList extends React.Component {

   // iterate through an array of flyers to generate jsx for each flyer
   renderFlyers () {
    if(this.props.flyers.length > 0){
      return this.props.flyers.map(
        (flyer, index) => {

          return(
            <Col xs={12} sm={6} md={3} >
              <Flyer key={index} flyer={flyer} />
            </Col>
          )
        }
      )
    }
    else{
      return [];
    }
  }

  render () {
    var renderedFlyers = this.renderFlyers();

    var masonryOptions = {
      transitionDuration: 0,
    };

    return (

          <Masonry
                className={'my-gallery-class'}
                options={masonryOptions}
                enableResizableChildren={true}
            >
                 {renderedFlyers}
          </Masonry>

    )
  }
}

FlyerList.propTypes = {
  flyers: React.PropTypes.array.isRequired
}

export { FlyerList }
