import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { Flyer } from './Flyer'
import { ObjectToArray } from '../Commen'

class StudentProfile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listOfFlyersLiked: [],
            listOfOrgsFollowed: []
        }
    }

    componentWillMount(){
        const { FlyersLiked } = this.props.user
        
        //prepare user liked flyers
        let flyerArray = ObjectToArray(FlyersLiked)
        let likedFlyers = (this.props.flyers || []).filter(
            (flyer) => {
               return flyerArray.includes(flyer.id)
            }
        )
        var listOfFlyersLiked = likedFlyers.map(
            (flyer, index) => {
                return <Flyer flyer={flyer} key={index}/>
            }
        )

        //prepare user followed orgs:


        //put data upto state
        this.setState({
            listOfFlyersLiked: listOfFlyersLiked
            //listOfOrgsFollowed: 
        })
    }

    render(){


        return(
            <div className='container'>
                <Row>
                    <h1> My Liked Flyers</h1>
                    <hr/>
                    {this.state.listOfFlyersLiked}
                </Row>
                <Row>
                    <h1> My Followed Organizations</h1>
                    <hr/>
                    {/*listOfOrgsLiked goes here*/}
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        flyers: state.data.events,
        orgs: state.data.orgs
    }
}

const ProfileStudent = connect(mapStateToProps)(StudentProfile)
export { ProfileStudent }