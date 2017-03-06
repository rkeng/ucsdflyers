import React from 'react'
import { Panel, Carousel, Button, Image} from 'react-bootstrap'
import RED from '../asset/RED.jpg'
import { Col} from 'react-bootstrap'

const carouselInstance = (
  <Carousel>
    <Carousel.Item>
       <Image src={RED} responsive/><br/>
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
       <Image src={RED} responsive/><br/>
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
       <Image src={RED} responsive/><br/>
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

class Flyer extends React.Component{
    
    render() {
       const {
           name,
           location,
           description,
           date
       } = this.props.flyer
        return(
                <Col sm={6} md={4}>
                
                <Panel footer={name} bsStyle="success">
                    
                    {carouselInstance}

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
        )
    }
}

export { Flyer }
