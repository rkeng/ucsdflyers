import React from 'react'
import { Panel } from 'react-bootstrap'

const Flyer = ({flyer}) => {
  return(
      <div className="col-sm-6">
        <Panel header={flyer.name} bsStyle="success">
              Location: {flyer.location}<br/>
              Description: {flyer.description}<br/>
              Date: {flyer.date}
        </Panel>
      </div>
  )
}


class FlyerList extends React.Component {

 // iterate through an array of flyers to generate jsx for each flyer
 renderFlyers () {
    if(this.props.flyers.length > 0){
        return this.props.flyers.map((flyer, index) =>
          (<Flyer key={index} index={index} flyer={flyer}/>)
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
