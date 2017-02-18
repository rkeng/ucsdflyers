import React from 'react'
import { Badge, Panel } from 'react-bootstrap'

class FlyerList extends React.Component {

    // Generates a list of feedbacks
  getFlyerList () {
    return this.props.flyers.map((flyer) => {
      let name = flyer.name
      let date = flyer.date
      let location = flyer.location
      let description = flyer.description

      let header = (
                <div>
                    <Badge>{name}</Badge>
                    <Badge>{date}</Badge>
                    <Badge>{location}</Badge>
                </div>
            )

      return <Panel key={name} bsStyle='info' header={header}>{description}</Panel>
    })
  }

  render () {
    return (
            <div className='container'>
              {this.getFlyerList()}
            </div>
    )
  }

}

FlyerList.propTypes = {
  flyers: React.PropTypes.array.isRequired
}

export { FlyerList }
