import React from 'react'
import { ColCenter } from '../Commen'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { Flyer } from './Flyer'
import { Org } from './Org'
import { RecruitmentNote } from './RecruitmentNote'
import { ObjectToArray } from '../Commen'

class StudentProfile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listOfFlyersLikedData: [],
            listOfOrgsFollowedData: [],
            listOfRecruitmentsSavedData: []
        }
    }

    componentWillMount(){
        const { FlyersLiked, OrgsFollowed, RecruitmentNotesSaved } = this.props.user
        
        //prepare user liked flyers data
        let flyerArray = ObjectToArray(FlyersLiked)

        // prepare user followed orgs data 
        let orgArray = ObjectToArray(OrgsFollowed)

        // prepare user followed orgs data
        let recArray = ObjectToArray(RecruitmentNotesSaved)


        //put data upto state
        this.setState({
            // listOfFlyersLiked: listOfFlyersLiked,
            listOfFlyersLikedData: flyerArray,
            listOfOrgsFollowedData: orgArray,
            listOfRecruitmentsSavedData: recArray
        })
    }

    render(){
        //prepare liked flyers UI
        let likedFlyers = (this.props.flyers || []).filter(
            (flyer) => {
               return this.state.listOfFlyersLikedData.includes(flyer.id)
            }
        )
        var listOfFlyersLiked = likedFlyers.map(
            (flyer, index) => {
                return (
                        <Flyer flyer={flyer} key={index}/>
                )
            }
        )


        //prepare liked org UI
        let followedOrgs = (this.props.orgs || []).filter(
            (org) => {
                return this.state.listOfOrgsFollowedData.includes(org.id)
            }
        )
        var listOfOrgsFollowed = followedOrgs.map(
            (org, index) => (
                <ColCenter>
                        <Org key={index} org={org}/>
                </ColCenter>
            )
        )

        //prepare save rec UI
        let savedRec = (this.props.rec|| []).filter(
            (rec) => {
                return this.state.listOfRecruitmentsSavedData.includes(rec.id)
            }
        )
        var listOfRecruitmentsSaved = savedRec.map(
            (rec, index) => (
                <ColCenter>
                   <RecruitmentNote data={rec} key={index}/>
                </ColCenter>
            )
        )

        return(
            <div className='container'>
                <Row>
                    <h1> My Liked Flyers</h1>
                    <hr/>
                    {listOfFlyersLiked}
                </Row>
                <Row>
                    <h1> My Save RecruitmentNote</h1>
                    <hr/>
                    {listOfRecruitmentsSaved}
                </Row>
                <Row>
                    <h1> My Followed Organizations</h1>
                    <hr/>
                    {listOfOrgsFollowed}
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        flyers: state.data.events,
        orgs: state.data.orgs,
        rec: state.data.recruitments
    }
}

const ProfileStudent = connect(mapStateToProps)(StudentProfile)
export { ProfileStudent }