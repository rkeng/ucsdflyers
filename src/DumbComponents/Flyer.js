import React from 'react'
import { Carousel, Col, Image, Button } from 'react-bootstrap'
import { FaHeart, FaHeartO } from 'react-icons/lib/fa';
import { fetchDataOn, remove, update, set } from '../models'
import { connect } from 'react-redux'
import { Card, CardMedia, CardTitle, CardText } from 'react-toolbox/lib/card';
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

class OneFlyer extends React.Component{

    constructor(props){
      super(props)

      const { id } = this.props.flyer
      const { isAutheticated, uid } = this.props.user
      const flyerID = id;
      const newData = {};
      newData[`${flyerID}`] = flyerID
      this.state = {
        liked: false, //liked tells us whether this flyer is liked by the logged in user
        userAlreadyLike: false
      }
      if(isAutheticated){
        fetchDataOn('users/' + uid).then(snap => {
          const userData = snap.val()
          if(userData.FlyersLiked && userData.FlyersLiked[`${flyerID}`]){
            this.setState({
              liked:true, //setting this will make all flyers that user already liked still appear liked
              userAlreadyLike: true //used to update database => see componentWillUnmount
            })
          }
        })
      }
      this.onLike = this.onLike.bind(this)
    }


    componentWillUnmount(){

      const { uid } = this.props.user
      const { id } = this.props.flyer
      const { liked, userAlreadyLike, isAutheticated } = this.state
      var thisFlyer = {}
      thisFlyer[`${id}`] = id
      if(liked && !userAlreadyLike && isAutheticated){//only the loggedin user's likes are counted
        update(`users/${uid}/FlyersLiked`, thisFlyer)
        // transaction(`events/${id}/likes`).then(likes => likes + 1)
        this.updateLikes(+1)
      } 
      if(!liked && userAlreadyLike ){
          // console.log('user unliked the flyer and user has previously liked the flyer')
          remove(`users/${uid}/FlyersLiked/`, thisFlyer)
          // transaction(`events/${id}/likes`).then(likes => likes - 1)
          this.updateLikes(-1)
      }
      //for those flyers that are (!liked && !userAlreadyLike), do nothing with them
    }

    onLike(){
      this.setState({
          liked: !this.state.liked
      })
    }

    updateLikes(update){
      const { id } = this.props.flyer
      // fetchDataOn(`events/${id}/likes`).then(snap => {
      //     var value = snap.val();
      //     if(typeof value === 'object'){
      //       throw new Error('Single Update is only allow on non-object field of the database')
      //     } else {
      //       set(`events/${id}/likes`, value+update)
      //     }
      // })
    }
    render() {
        const {
           name,
           location,
           description,
           date
         } = this.props.flyer
         const btnColor = this.state.liked ? 'danger' : 'info'
         const HeatIcon =  this.state.liked ?  FaHeart : FaHeartO 
         const titleAndBtn = (
            <div>
                {name}
                <span className='pull-right'>
                  <Button onClick={this.onLike} bsStyle={btnColor}>
                        <HeatIcon/>
                  </Button>
                </span>
            </div>
          )
        return(
                <Col sm={12} md={4}>
                   <Card raised>
                    <CardMedia
                      aspectRatio="wide"
                      children={carouselInstance}
                    />
                    <CardTitle
                      title={titleAndBtn}
                      subtitle={`Date: ${date} @${location}`}
                    />
                    <CardText>
                      {description}
                    </CardText>
                  </Card>
                </Col>
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
