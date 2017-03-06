import React from 'react'
import { Panel, Col, Button, Image, Grid, Row } from 'react-bootstrap'
import RED from '../asset/RED.jpg'
import { FaThumbsOUp, FaThumbsUp, FaCheckCircleO, FaCheckCircle } from 'react-icons/lib/fa';
import {  transaction, fetchDataOn, createNew, remove, update } from '../models'
import { connect } from 'react-redux'
import { NotificationManager, NotificationContainer } from 'react-notifications'

class OneFlyer extends React.Component{

      constructor(props){
        super(props)
        const { id } = this.props.flyer
        const { uid } = this.props.user
      const newData = {};
      newData[`${id}`] = id
        this.state = {
          userLiked: false,
          userGo: false,
          like: this.props.flyer.like,
          go: this.props.flyer.go
        };
        fetchDataOn('users/' + uid).then(userData => {
          if(userData.likedFlyers.newData){
            this.setState({userLiked:true})
          }
        })

        this.setButtonState1 = this.setButtonState1.bind(this)
        this.setButtonState2 = this.setButtonState2.bind(this)

      }

        // update('events/'+this.props.flyer.id+'/go', this.state.go

      setButtonState1(){
        const { id } = this.props.flyer
        const { uid } = this.props.user
        const newData = {};
        newData[`${id}`] = id
        if(this.state.userLiked === false){
        update('users/' + uid + '/likedFlyers', newData)
      }
      else{
        remove('users/' + uid + 'likedFlyers/', newData)
      }
      console.log(this.state)
        this.setState({
            userLiked: this.state.userLiked? false : true,
            like: this.state.userLiked ? (this.state.like-1) : (this.state.like+1)
        })
        console.log(this.state)
          transaction('events/'+ id +'/like',this.state.like)
      }






      setButtonState2(){
        const { id } = this.props.flyer
        const { uid } = this.props.user
        const newData = {};
        newData[`${id}`] = id
        if(this.state.userGo === false){
          update('users/' + uid + '/WTGFlyers', newData)
        }
        else{
          remove('users/' + uid + '/WTGFlyers', newData)
        }

        this.setState({
            userGo: this.state.userGo? false : true,
            go: this.state.userGo? (this.state.go-1) : (this.state.go+1)
          }
        )
          transaction('events/'+id+'/go',this.state.go)
      }

    render() {
        const {
           name,
           location,
           description,
           date
         } = this.props.flyer

        return(
                <Panel header={name} bsStyle="success">
                  <NotificationContainer/>
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
                      <Col md={1} >
                        <Button onClick={this.setButtonState1} bsStyle={this.state.userLiked ?  "danger" : "success"}>{this.state.userLiked ?  'Unlike' : 'Like'}</Button>&nbsp;
                        {this.state.userLiked ?  <FaThumbsUp/> : <FaThumbsOUp/> }
                        {this.state.like}
                      </Col>

                      <Col md={1} mdPush={0.5}>
                        <Button onClick={this.setButtonState2} bsStyle={this.state.userGo ?  "danger" : "primary"}>{this.state.userGo ? 'No Longer Wanna Go' : 'Wanna Go'}</Button>
                        {this.state.userGo ?  <FaCheckCircle/> : <FaCheckCircleO/> }
                        {this.state.go}
                        </Col>
                    </Row>
                      </Grid>

                  </Col>
                </Panel>
        )
    }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

const Flyer = connect(mapStateToProps)(OneFlyer)

export { Flyer }
