import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { Flyer } from './Flyer'
import { Org } from './Org'
import { ObjectToArray } from '../Commen'
import { Panel } from 'react-bootstrap';

class StudentProfile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listOfFlyersLiked: [],
            listOfOrgsFollowed: []
        }
    }

    componentWillMount(){
        const { FlyersLiked, OrgsFollowed } = this.props.user
        
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
        let orgArray = ObjectToArray(OrgsFollowed)
        let followedOrgs = (this.props.orgs || []).filter(
            (org) => {
                return orgArray.includes(org.id)
            }
        )
        var listOfOrgsFollowed = followedOrgs.map(
            (org, index) => (
                <Panel header={org.name} eventKey={index} key={index}>
                    <Org key={index} org={org}/>
                </Panel>
            )
        )

        //put data upto state
        this.setState({
            listOfFlyersLiked: listOfFlyersLiked,
            listOfOrgsFollowed: listOfOrgsFollowed
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
                    {this.state.listOfOrgsFollowed}
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