import React from 'react'
import { Panel, Col, Button, Image } from 'react-bootstrap'
import RED from '../asset/RED.jpg'
import AnimakitRotator from 'animakit-rotator';

class Flyer extends React.Component{

  constructor (props) {
    super(props)
    this.state={
      index:"image"
    }
  }

  changeFace(event) {
       if(this.state.index === "image"){
         this.setState({index:"info"});
       }
       else if(this.state.index === "info"){
         this.setState({index:"button"});
       }
       else{
         this.setState({index:"image"});
       }
    }

    render() {
       const {
           name,
           location,
           description,
           date
       } = this.props.flyer
        return(
          <div className="col-sm-6" onClick={this.changeFace.bind(this)}>
          <Col xs={6} md={12}>
          <AnimakitRotator side = {this.state.index}>
                  <Image key = "image" width={370} height={400} alt="400x400" src={RED}/><br/>
                  <div key = "info">
                  <span>
                  <h3>{name}</h3>
                      Location: {location}<br/>
                      Description: {description}<br/>
                      Date: {date}
                  </span>
                  </div>
                  <div key = "button">
                      <Button bsStyle="success">Like</Button>&nbsp;
                      <Button bsStyle="primary">Wanna Go</Button>
                      <a href="#"><span></span></a>
                  </div>
              </AnimakitRotator>
              </Col>
      </div>
        )
    }
}

export { Flyer }
