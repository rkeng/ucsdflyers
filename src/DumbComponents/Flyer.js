import React from 'react'
import {Col, Button, Panel, Thumbnail} from 'react-bootstrap'
import RED from './RED.jpg'

class Flyer extends React.Component{
    
    render() {
       const {
           name,
           location,
           description,
           date
       } = this.props.flyer

        return(
            <div className="col-sm-6">
                <Col xs={6} md={12}>
                    <Panel header={name} bsStyle="success">
                        <Thumbnail src={RED}>
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
                        </Thumbnail>
                   </Panel>
                </Col>
            </div>
        )
    }
}

export { Flyer }