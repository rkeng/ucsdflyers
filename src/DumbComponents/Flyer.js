import React from 'react'
import { Panel, Carousel, Col, Image, Button, Grid, Row } from 'react-bootstrap'
import { FaThumbsOUp, FaThumbsUp, FaCheckCircleO, FaCheckCircle } from 'react-icons/lib/fa';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import RED from '../asset/RED.jpg'

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


      constructor(props){
        super(props)
        this.state = {
          like: false,
          go: false
        };
        this.setButtonState1 = this.setButtonState1.bind(this)
        this.setButtonState2 = this.setButtonState2.bind(this)

      }



      onLike(){
        this.setState({
            like: this.state.clicked1? false : true
          }

        )
      }
      setButtonState2(){
        this.setState({
            clicked2: this.state.clicked2? false : true


          }
        )
        //let go = this.props.flyer.go

      }

    render() {
        const {
           name,
           location,
           description,
           date,
           time,
           like,
           go
         } = this.props.flyer

        return(
                <Col sm={6} md={4}>
                 <Card style={{width: '350px', border: '10px'}} raised>
                  <CardMedia
                    aspectRatio="wide"
                    children={carouselInstance}
                  />
                  <CardTitle
                    title={name}
                    subtitle={`Date: ${date} @${location}`}
                  />
                  <CardText>
                    {description}
                  </CardText>
                  <CardActions>
                      <Col sm={3} md={1} lg={1}>
                        <Button onClick={this.setButtonState1} bsStyle={this.state.clicked1 ?  "primary" : "success"}>{this.state.clicked1 ?  'Unlike' : 'Like'}
                          {this.state.clicked1 ?  <FaThumbsUp/> : <FaThumbsOUp/> }
                          {like}
                        </Button>&nbsp;
                      </Col>
                      &nbsp;
                      <Col sm={3} md={1} mdOffset={2} lg={1}>
                        <Button onClick={this.setButtonState2} bsStyle={this.state.clicked2 ?  "primary" : "success"}>{this.state.clicked2 ? 'Going!' : 'Going?'}
                          {this.state.clicked2 ?  <FaCheckCircle/> : <FaCheckCircleO/> }
                          {go}
                        </Button>
                      </Col>
                  </CardActions>
                </Card>


                </Col>
        )
    }
}

export { Flyer }