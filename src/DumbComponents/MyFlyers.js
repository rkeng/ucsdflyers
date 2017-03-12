import React from 'react'
import { connect } from 'react-redux'
import { Flyer } from './Flyer'
import { ObjectToArray } from '../Commen'
import { Card, CardMedia, CardTitle, CardText } from 'react-toolbox/lib/card';
import { ColCenter } from '../Commen'
import { Carousel, Col, Image, Button, Row } from 'react-bootstrap'

//You should be able to access user info through this.props.user
//That is just static/local info. If you need to update user info on firebase, you need to
// use functions in models/index.js

//To center the UI, you can use <ColCenter>  ... </ColCenter>, 
//It is avaiable in Commen:
//import { ColCenter } from '../Commen'
class MyFlyersPage extends React.Component{

    render(){
        const {
            name,
            location,
            description,
            date,
            images,
            likes
        } = this.props.flyer
        console.log('user state', this.props.user)
        const { FlyersLiked } = this.props.user
        //flyer array
        let flyerArray = ObjectToArray(FlyersLiked)
            flyerArray.map(
                (flyer) => {
                    return <Flyer flyer={flyer}/>
                }
            )
        // return <div> This is MyFlyers Page</div>
        //return(){
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
        //}

        return(
            <Col sm={12} md={3} >
                <Row>
                    <Card raised={true} className='raised'>
                        <CardMedia aspectRatio="wide" children={carouselInstance} />
                        <CardTitle //title={titleAndBtn}
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

const MyFlyers = connect(mapStateToProps)(MyFlyersPage)
export { MyFlyers }