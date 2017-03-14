import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Flyer } from './Flyer'
import { RecruitmentNote} from './RecruitmentNote'
import { ObjectToArray } from '../Commen'

class OrgProfilePage extends React.Component{

    constructor(props){
        super(props)
        this.state={
            listOfFlyersCreated: [],
            listOfRecruitmentsCreated: []
        }
    }

    componentWillMount(){
        const { FlyersCreated, RecruitmentNotesCreated } = this.props.user
        // const { RecruitmentCreated } = this.props.recruitmentNotes
        
        //prepare user created flyers
        let flyerArray = ObjectToArray(FlyersCreated)
        let createdFlyers = (this.props.flyers || []).filter(
            (flyer) => {
               return flyerArray.includes(flyer.id)
            }
        )
        var listOfFlyersCreated = createdFlyers.map(
            (flyer, index) => {
                return(
                        <Flyer flyer={flyer} key={index}/>
                )
            }
        )

        //prepare user's recruitment notes
        let recruitmentArray = ObjectToArray(RecruitmentNotesCreated)

        let createdRecruitments = (this.props.recruitments || []).filter(
            (recruitment) => {
                return recruitmentArray.includes(recruitment.id)
            }
        )

        var listOfRecruitmentsCreated = createdRecruitments.map(
            (recruitment, index) => {
                return <RecruitmentNote data={recruitment} key={index}/>
            }
        )


        //put data upto state
        this.setState({
            listOfFlyersCreated: listOfFlyersCreated,
            listOfRecruitmentsCreated: listOfRecruitmentsCreated
        })
    }

    render(){
        return(
            <div className='container'>
                <Row>
                    <h1> My Created Flyers </h1>
                    <hr/>
                    {this.state.listOfFlyersCreated}
                </Row>

                <Row>
                    <h1> My Created Recruitments </h1>
                    <hr/>
                    <Col md={5}>
                        {this.state.listOfRecruitmentsCreated}
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        state: state,
        user: state.user,
        flyers: state.data.events,
        recruitments: state.data.recruitments
    }
}
const OrgProfile = connect(mapStateToProps)(OrgProfilePage)
export { OrgProfile }

// <button onClick={() => {
//     console.log('this.props', this.props)
//     console.log('this.state', this.state)
// }}> Show page info </button>