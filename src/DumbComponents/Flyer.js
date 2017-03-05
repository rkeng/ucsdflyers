import React from 'react'
import { Panel, Col, Button, Image } from 'react-bootstrap'
import RED from '../asset/RED.jpg'
import { ColCenter } from '../Commen'

class Flyer extends React.Component{
    
    render() {
       const {
           name,
           location,
           description,
           date
       } = this.props.flyer
        return(
                <Panel header={name} bsStyle="success">
                  <Col sm={12} mdOffset={3} md={8}>
                    <Image width={370} height={400} alt="400x400" src={RED} responsive/><br/>
                    <h3>{name}</h3>
                    <p>
                        Location: {location}<br/>
                        Description: {description}<br/>
                        Date: {date}
                    </p>
                    <p>
                        <Button bsStyle="success">Like</Button>&nbsp;
                        <Button bsStyle="primary">Wanna Go</Button>
                    </p>
                  </Col>
                </Panel>
        )
    }
}

export { Flyer }