import React from 'react'
import { remove, update } from '../firebase'
import { Button, Row, Col, Well, Modal, Panel } from 'react-bootstrap'
import AnimakitExpander from 'animakit-expander';
// import { ColCenter } from '../Commen'
// import { FaPlusSquareO, FaPlusSquare } from 'react-icons/lib/fa';
import { connect } from 'react-redux'
import { PureFlyer } from './Flyer'
import { RecruitmentNote } from './RecruitmentNote'
import { ObjectToArray, activeDate } from '../commons'
import { Link } from 'react-router'
import Alert from 'react-s-alert';


class OneOrg extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
      followed: false,
      showLogin: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  studentUserUnfollowedOrg(){
        const { isAuthenticated, isOrg, OrgsFollowed } = this.props.user
        const { id } = this.props.org
        return isAuthenticated && !isOrg && !OrgsFollowed.hasOwnProperty(id)
  }

  studentUserFollowedOrg(){
        const { isAuthenticated, isOrg, OrgsFollowed } = this.props.user
        const { id } = this.props.org
        return isAuthenticated && !isOrg && OrgsFollowed.hasOwnProperty(id)
  }

  handleClick () {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  handleFollow () {

    const { uid, isAuthenticated, isOrg } = this.props.user
    if(!isAuthenticated){
       return this.setState({showLogin: true})
    }
    if(isAuthenticated && isOrg){
        Alert.error('Come on! What\'s the point for a org to follow another org? Orgs don\'t follow other org', 1111);
        return null
    }
    const { id } = this.props.org
    var newOrg = {}
    newOrg[`${id}`] = id

    if(this.studentUserUnfollowedOrg()){
      //update method will only update the field, not overwriting the whol thing
      update(`users/${uid}/OrgsFollowed`, newOrg)
      this.setState({ followed: true })
    }
    if(this.studentUserFollowedOrg()){
      remove(`users/${uid}/OrgsFollowed/${id}`)
      this.setState({ followed: false })
    }
  }

  render () {

  	const {
  		name,
  		description,
      website,
      belongsTo
  	} = this.props.org;

    //prepare the follow or unfollor button
    var isFollowed = this.state.followed
    if(this.studentUserFollowedOrg()){ //don't allow org to follow orgs
      isFollowed = true
    }
    if(this.studentUserUnfollowedOrg()){
      isFollowed = false
    }
 
    const btnColor = isFollowed ? 'danger' : 'success'
    
    const titleAndBtn = (
      <div>
            <Button onClick={this.handleFollow} bsStyle={btnColor}>
              {isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
      </div>
    )

    //prepare the flyers or recruitments of the org
    var master = belongsTo //belongsTo being true means the org is claimed by a org;     
    var orgsFlyers = []
    var ogrsRecruitments = []
    var createdFlyers = []
    if(master){ //if the org's master

        //prepare the org's created flyers
        var flyerArray = ObjectToArray(master.FlyersCreated)
        createdFlyers = (this.props.flyers || []).filter(
            (flyer) => {
               return activeDate(flyer.date) && flyerArray.includes(flyer.id)
            }
        )
        // let activeFlyers = createdFlyers.filter(flyer => activeDate(flyer.date))
        orgsFlyers = createdFlyers.map(
          (flyer, index) => {
            return (
              <Col xs={12} sm={12} md={6} key={index}>
                <PureFlyer flyer={flyer}/>
              </Col>
            )
          }
        )

        //prepare the org's created recruitmentNotes
        var recArray = ObjectToArray(master.RecruitmentNotesCreated)
        let createdRecs = (this.props.recs || []).filter(
            (rec) => {
              return recArray.includes(rec.id)
            }
        )
        ogrsRecruitments = createdRecs.map(
            (rec, index) => {
              return <RecruitmentNote key={index} data={rec}/>
            }
        )
    }
    // var orgsFlyers = this.state.masterFlyers.map((flyer, index )=> <Flyer key={index} flyer={flyer}/>)
    // var orgsRecs = this.state.masterRecruitments.map((rec, index) => <RecruitmentNote key={index} data={rec}/>)
      // {belongsTo === "vjiMXeqx1BfwOdG5PePyYzPG2WQ2" ? console.log('state', this.state) : btnColor}
    return (
      <Row>
        <Panel collapsible header={name} eventKey={this.props.eventKey}> 
            <div>
                {description}
                <br/>
                <Row>
                  <Col sm={1} md={1}>
                    {titleAndBtn}
                  </Col>
                  <Col smOffset={1} sm={1} md={1}>
                    <Button onClick={this.handleClick}>{this.state.expanded ? 'See less' : 'See more'}</Button>
                  </Col>
                </Row>
            </div>
            <div>
                <Modal show={this.state.showLogin}>
                    <Modal.Title>
                        <p className="text-center">Following Orgs requires being logged in.<br/> Would you like to be our user?</p>
                    </Modal.Title>
                    <Modal.Footer>
                        <Link to='login' className='btn btn-success'>Login</Link>
                        <Button onClick={()=>this.setState({showLogin:false})}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Panel>
        <AnimakitExpander expanded={this.state.expanded}>
          <Col>
              <Well>
                <div className='text-center'>
                  {`${name}'s Website: ${website==='N/A'? 'N/A': website}`}
                </div>
                <Row>
                  <h5>{`${name}'s Flyers: `}</h5>
                  <hr/>
                  {orgsFlyers}
                </Row>                    
                <Row>
                  <h5>{`${name}'s RecruitmentNotes: `}</h5>
                  <hr/>
                  {ogrsRecruitments}
                </Row>
              </Well>
          </Col>
        </AnimakitExpander> 
      </Row>
    )
  }
}
                        // {belongsTo === 'vjiMXeqx1BfwOdG5PePyYzPG2WQ2' ? console.log('state data?', this.state) : console.log('skip')}
//this.props.user
function mapStateToProps(state){
    return{
        user: state.user,
        recs: state.data.recruitments,
        flyers: state.data.events
    }
}

const Org = connect(mapStateToProps)(OneOrg)

export { Org }
