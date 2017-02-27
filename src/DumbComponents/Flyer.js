import React from 'react'
import { Panel, Col, Button } from 'react-bootstrap'
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

                        {/*<img width={370} height={400} alt="400x400" src={RED}/><br/>*/}

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

                    </Panel>
                </Col>
            </div>
        )
    }
}

export { Flyer }
