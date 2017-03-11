import React from 'react'
import { Carousel, Col, Image, Button, Row } from 'react-bootstrap'
import { FaHeart, FaHeartO } from 'react-icons/lib/fa';
import { remove, update } from '../models'
import { ObjectToArray } from '../Commen'
import { connect } from 'react-redux'
import { Card, CardMedia, CardTitle, CardText } from 'react-toolbox/lib/card';

class OneFlyer extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            liked:false
        }
        this.onLike = this.onLike.bind(this)
    }

    userLoggedInAsStudentNotLikedFlyer(){
        const { isAuthenticated, isOrg, FlyersLiked } = this.props.user
        const { id } = this.props.flyer
        return isAuthenticated && !isOrg && !FlyersLiked.hasOwnProperty(id)
    }

    userLoggedInAsStudentLikedFlyer(){
        const { isAuthenticated, isOrg, FlyersLiked } = this.props.user
        const { id } = this.props.flyer
        return isAuthenticated && !isOrg && FlyersLiked.hasOwnProperty(id)
    }

    onLike(){
        const { uid } = this.props.user
        const { id, likes } = this.props.flyer
        var newFlyer = {}
        newFlyer[`${id}`] = id

        if(this.userLoggedInAsStudentNotLikedFlyer()){
            //update method will only update the field, not overwriting the whol thing
            update(`users/${uid}/FlyersLiked`, newFlyer)
            update(`events/${id}`, {likes: likes + 1})
        }
        if(this.userLoggedInAsStudentLikedFlyer()){
            remove(`users/${uid}/FlyersLiked/${id}`)
            update(`events/${id}`, {likes: likes - 1})
        }

    }

    render() {
        const {
            name,
            location,
            description,
            date,
            images,
            likes
        } = this.props.flyer

        //prepare the images
        const imagesArray = ObjectToArray(images)
        const CarouselItems = imagesArray.map(function(image){
            return (
                <Carousel.Item key={image.imageUrl}> 
                    <Image src={image.imageUrl} width={350} responsive/><br/>
                </Carousel.Item>
            )
        })
        const carouselInstance = (
            <Carousel>
                {CarouselItems}
            </Carousel>
        )

        //prepare the liked state of the button
        var isLiked = this.state.liked
        if(this.userLoggedInAsStudentLikedFlyer()){ //don't allow org to like flyers
            isLiked = true
        }
        if(this.userLoggedInAsStudentNotLikedFlyer()){
            isLiked = false
        }

        //prepare the like button
        const btnColor =  isLiked ? 'danger' : 'info'
        const HeatIcon =  isLiked ?  FaHeart : FaHeartO 
        const titleAndBtn = (
            <div>
                {name}
                <span className='pull-right'>
                    <Button onClick={this.onLike} bsStyle={btnColor}>
                        <HeatIcon/>{likes}
                    </Button>
                </span> 
            </div>
        )

        //
        return(
            <Col sm={12} md={3} >
                <Row>
                    <Card raised={true} className='raised'>
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
                    <br/>
                </Row>
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
