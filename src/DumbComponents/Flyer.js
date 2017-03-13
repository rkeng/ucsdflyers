import React from 'react'
import { Carousel, Col, Image, Button } from 'react-bootstrap'
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
        this.onDelete = this.onDelete.bind(this)
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

    orgUserDeleteFlyer(){
        const { isAuthenticated, isOrg, FlyersCreated } = this.props.user
        const { id } = this.props.flyer
        return isAuthenticated && isOrg && FlyersCreated.hasOwnProperty(id)
    }

    onDelete(){
        const { uid } = this.props.user
        const { id } = this.props.flyer
        if(this.orgUserDeleteFlyer()){
            remove(`users/${uid}/FlyersCreated/${id}`)
            remove(`events/${id}`)
        }
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
        const { FlyersCreated } = this.props.user
        const {
            name,
            location,
            description,
            date,
            images,
            likes,
            id
        } = this.props.flyer

        const flyersArray = ObjectToArray(FlyersCreated)
        var displayDelete = false
        if(flyersArray.includes(id)){
            displayDelete = true
        }

        //prepare the images
        const imagesArray = ObjectToArray(images)
        var CarouselItems = <Image src={imagesArray[0].imageUrl || imagesArray[0].preview} width={350} responsive/>
        var carouselInstance = CarouselItems;
        if(imagesArray.length !== 1){
            CarouselItems = imagesArray.map(function(image, index){
                return (
                    <Carousel.Item key={index}>
                        <Image src={image.imageUrl || image.preview} width={350} responsive/><br/>
                    </Carousel.Item>
                )
            })
            carouselInstance = (
                <Carousel>
                    {CarouselItems}
                </Carousel>
            )
        }

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
        const titleAndLikeBtn = (
            <div>
                {name}
                <span className='pull-right'>
                    <Button onClick={this.onLike} bsStyle={btnColor}>
                        <HeatIcon/>{likes}
                    </Button>
                </span>
            </div>
        )
        const titleAndDeleteBtn = (
            <div>
                {name}
                <span className='pull-right'>
                    <Button onClick={this.onDelete} bsStyle={'danger'}>
                        Delete
                    </Button>
                </span>
            </div>
        )
        //
        return(
            <Col xs={12} sm={12} md={3} >
                <Card raised={true} className='raised'>
                    <CardMedia
                        aspectRatio="wide"
                        children={carouselInstance}
                    />
                    <CardTitle
                        title={displayDelete? titleAndDeleteBtn : titleAndLikeBtn}
                        subtitle={`Date: ${date} @${location}`}
                    />
                    <CardText>
                        {description}
                    </CardText>
                </Card>
                <br/>
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
