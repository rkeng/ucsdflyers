import React from 'react'
import { remove, update } from '../models'
import { Button, Row } from 'react-bootstrap'
import AnimakitExpander from 'animakit-expander';
import { ColCenter } from '../Commen'
//import { FaPlusSquareO, FaPlusSquare } from 'react-icons/lib/fa';
import { connect } from 'react-redux'
// import { Flyer } from './Flyer'
// import { RecruitmentNote } from './RecruitmentNote'
// import { ObjectToArray } from '../Commen'
// import { firebase } from '../models/FlyersFirebase'


class OneOrg extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
      followed: false,
      flyersOfTheOrg: [],
      recsOfTheOrg: [],
      masterFlyers:[],
      masterRecruitments:[]

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

    const { uid } = this.props.user
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

  // componentWillMount(){
  //   const { belongsTo } = this.props.org
  //   var masterIDArray = ObjectToArray(belongsTo) //array of often one string
  //   firebase.database().ref(`users/`).once('value').then(snap=>{
  //     var allUsers = snap.val();
  //     var userArray = ObjectToArray(allUsers)
  //     var masters =  userArray.filter((user) => {
  //       return masterIDArray.includes(user.id)
  //     })
  //     masters.forEach(master => {
  //         console.log('orgs master is:',master)
  //         var { FlyersCreated, RecruitmentNotesCreated } = master;
  //         var flyerIDs = ObjectToArray(FlyersCreated)
  //         console.log('flyers ID', flyerIDs)
  //         var realFlyerData = this.props.flyers.filter((f) => flyerIDs.includes(f.id))
  //         console.log('flyers datas', realFlyerData)
  //         var recIDs = ObjectToArray(RecruitmentNotesCreated)
  //         var realRecData = this.props.recs.filter(r=> recIDs.includes(r.id))
  //         this.setState({
  //           masterFlyers: realFlyerData,
  //           masterRecruitments:realRecData
  //         })
  //     })
  //   })
  // }
  render () {

  	const {
  		name,
  		description,
      website
      // belongsTo
  	} = this.props.org;

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
          <span className='pull-right'>
            <Button onClick={this.handleFollow} bsStyle={btnColor}>
              {isFollowed ? 'Unfollow' : 'Follow'} {name}
            </Button>
          </span>
      </div>
    )

    // var orgsFlyers = (this.state.masterFlyers || []).map((flyer, index )=> <Flyer key={index} flyer={flyer}/>)
    // var orgsRecs = (this.state.masterRecruitments || []).map((rec,index) => <RecruitmentNote key={index} data={rec}/>)
    return (
      <div>
          <ColCenter>
              {description}
              {titleAndBtn}
              <br/>
              <Button onClick={this.handleClick}>{this.state.expanded ? 'See less' : 'See more'}</Button>
              <AnimakitExpander expanded={this.state.expanded}>
                  <div className="text">
                    <Row>
                      {name}'s Website: {website==='N/A'? 'N/A':<a id="link" href={website} target="_blank">{website}</a>}
                    </Row>
                  </div>
              </AnimakitExpander> 
          </ColCenter>
      </div>
    )
  }
}
                    // <Row>
                    //   <h5>Org's Flyers: </h5>
                    //   <hr/>
                    //   {orgsFlyers}
                    // </Row>                    
                    // <Row>
                    //   <h5>Org's RecruitmentNotes: </h5>
                      // <hr/>
                      // {orgsFlyers}
                    // </Row>
//this.props.user
function mapStateToProps(state){
    return{
        user: state.user,
        // recs: state.data.recruitments,
        // // flyers: state.data.events
    }
}

const Org = connect(mapStateToProps)(OneOrg)

export { Org }
