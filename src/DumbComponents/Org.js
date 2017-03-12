import React from 'react'
import { update } from '../models'
import { Button } from 'react-bootstrap'
import AnimakitExpander from 'animakit-expander';
import { ColCenter } from '../Commen'
//import { FaPlusSquareO, FaPlusSquare } from 'react-icons/lib/fa';
import { connect } from 'react-redux'
import { firebase } from '../models/FlyersFirebase'

class OneOrg extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
      followed: false
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

    const db = firebase.database();

    if(this.studentUserUnfollowedOrg()){
      //update method will only update the field, not overwriting the whol thing
      update(`users/${uid}/OrgsFollowed`, newOrg)
      this.setState({ followed: true })
    }
    if(this.studentUserFollowedOrg()){
      db.ref(`users/${uid}/OrgsFollowed`).child(id).remove()
      this.setState({ followed: false })
    }
  }

  componentWillMount () {
    if(this.studentUserUnfollowedOrg()){
      this.setState({ followed: false })
    }
    if(this.studentUserFollowedOrg()){
      this.setState({ followed: true })
    }
  }

  render () {

  	const {
  		name,
  		description,
      website
  	} = this.props.org;

    /*
    var isFollowed = this.state.followed
    if(this.studentUserFollowedOrg()){ //don't allow org to follow orgs
      isFollowed = true
    }
    if(this.studentUserUnfollowedOrg()){
      isFollowed = false
    }
    */

    const btnColor = this.state.followed ? 'danger' : 'success'
    
    const titleAndBtn = (
      <div>
          <span className='pull-right'>
            <Button onClick={this.handleFollow} bsStyle={btnColor}>
              {this.state.followed ? 'Unfollow' : 'Follow'} {name}
            </Button>
          </span>
      </div>
    )
    
    return (
          <ColCenter>
              {description}
              {titleAndBtn}
              <br/>
              <Button onClick={this.handleClick}>{this.state.expanded ? 'See less' : 'See more'}</Button>
              <AnimakitExpander expanded={this.state.expanded}>
                  <div className="text">
                    {name}'s Website: {website==='N/A'? 'N/A':<a id="link" href={website} target="_blank">{website}</a>}
                  </div>
              </AnimakitExpander>
          </ColCenter>
    )
  }
}
//this.props.user
function mapStateToProps(state){
    return{
        user: state.user
    }
}

const Org = connect(mapStateToProps)(OneOrg)

export { Org }
