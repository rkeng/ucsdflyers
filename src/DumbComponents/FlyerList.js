import React from 'react'

const Flyer = ({flyer}) => {
  console.log(flyer)
  return(
    <div className="col-sm-4">
      <div className="panel panel-default">
        <div className="panel-heading">
          {flyer.name}
        </div>
        <div className="panel-body">
          Location: {flyer.location}<br/>
          Description: {flyer.description}<br/>
          Place: {flyer.date}
        </div>
      </div>
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
