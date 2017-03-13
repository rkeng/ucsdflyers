import React from 'react'
import { ColCenter } from '../Commen'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { Flyer } from './Flyer'
import { Org } from './Org'
import { RecruitmentNote } from './RecruitmentNote'
import { ObjectToArray } from '../Commen'
import { Panel } from 'react-bootstrap';

class StudentProfile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listOfFlyersLiked: [],
            listOfOrgsFollowed: [],
            listOfRecruitmentsSaved: []
        }
    }

    componentWillMount(){
        const { FlyersLiked, OrgsFollowed, RecruitmentNotesSaved } = this.props.user
        
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

        // prepare user followed orgs:
        let orgArray = ObjectToArray(OrgsFollowed)
        let followedOrgs = (this.props.orgs || []).filter(
            (org) => {
                return orgArray.includes(org.id)
            }
        )
        var listOfOrgsFollowed = followedOrgs.map(
            (org, index) => (
                <ColCenter>
                    <Panel header={org.name} eventKey={index} key={index}>
                        <Org key={index} org={org}/>
                    </Panel>
                </ColCenter>
            )
        )
        // prepare user followed orgs:
        let recArray = ObjectToArray(RecruitmentNotesSaved)
        let savedRec = (this.props.rec|| []).filter(
            (rec) => {
                return recArray.includes(rec.id)
            }
        )
        var listOfRecruitmentsSaved = savedRec.map(
            (rec, index) => (
            <ColCenter>
               <RecruitmentNote data={rec} key={index}/>
            </ColCenter>
            )
        )

        //put data upto state
        this.setState({
            listOfFlyersLiked: listOfFlyersLiked,
            listOfOrgsFollowed: listOfOrgsFollowed,
            listOfRecruitmentsSaved: listOfRecruitmentsSaved
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
                    <h1> My Save RecruitmentNote</h1>
                    <hr/>
                    {this.state.listOfRecruitmentsSaved}
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
        orgs: state.data.orgs,
        rec: state.data.recruitments
    }
}

const ProfileStudent = connect(mapStateToProps)(StudentProfile)
export { ProfileStudent }