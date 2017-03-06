import React from 'react'
import { Panel, Col, Button, Image, Grid, Row } from 'react-bootstrap'
import RED from '../asset/RED.jpg'
import { FaThumbsOUp, FaThumbsUp, FaCheckCircleO, FaCheckCircle } from 'react-icons/lib/fa';

class Flyer extends React.Component{

      constructor(props){
        super(props)
        this.state = {
          clicked1: false,
          clicked2: false,
          like: this.props.flyer.like,
          go: this.props.flyer.go
        };

        this.setButtonState1 = this.setButtonState1.bind(this)
        this.setButtonState2 = this.setButtonState2.bind(this)

      }

      componentWillUnMount(){

      }

      setButtonState1(){
        console.log('clicked!')

        this.setState({
            clicked1: this.state.clicked1? false : true,
            like: this.state.clicked1? (this.state.like-1) : (this.state.like+1)
          }

        )
      }
      setButtonState2(){
        this.setState({
            clicked2: this.state.clicked2? false : true,
            go: this.state.clicked2? (this.state.go-1) : (this.state.go+1)

          }
        )
        let go = this.props.flyer.go
        go = go + 1;

      }


    render() {
        const {
           name,
           location,
           description,
           date,
           like,
           go
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

                    <Grid>
                    <Row>
                      <Col md={1} mdOffset={0}>
                        <Button onClick={this.setButtonState1} bsStyle={this.state.clicked1 ?  "danger" : "success"}>{this.state.clicked1 ?  'Unlike' : 'Like'}</Button>&nbsp;
                        {this.state.clicked1 ?  <FaThumbsUp/> : <FaThumbsOUp/> }
                        {this.state.like}
                      </Col>

                      <Col md={1} mdPush={0.5}>
                        <Button onClick={this.setButtonState2} bsStyle={this.state.clicked2 ?  "danger" : "primary"}>{this.state.clicked2 ? 'No Longer Wanna Go' : 'Wanna Go'}</Button>
                        {this.state.clicked2 ?  <FaCheckCircle/> : <FaCheckCircleO/> }
                        {this.state.go}
                        </Col>
                    </Row>
                      </Grid>

                  </Col>
                </Panel>
        )
    }
}

export { Flyer }
