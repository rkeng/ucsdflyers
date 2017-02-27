import React from 'react'
//import { Badge, Panel } from 'react-bootstrap'
import { FaCalendar, FaGroup, FaEnvelope } from 'react-icons/lib/fa';
import { Link } from 'react-router'
import {Grid, Row, Col} from 'react-bootstrap'
import { fetchDataOn } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
//var recruitRef = firebase.database().ref('recruitmentNode/')

class RecruitmentNote extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      orgname: "",
      title: "",
      date:"",
      description:""
    }
  }

  getRecruitmentNote(){
    const that = this;

    fetchDataOn('recruitmentNodes/0/className')
    .then(function(className){
        var newOrgName = className.val();
        that.setState({
            orgname: newOrgName
        })
    })

    let title = 'Job Title'
    let date = 'mm/dd/yyyy'
    let email = 'example@ucsd.edu'
    let description =
    'description description description description description description description description'
    /*let titles = title.map((job) =>{
      return<Badge color="success">{job}</Badge>
    })*/

    const pstyle = {
      fontSize: 20
      //color:"blue"
    };

    return (
      <div className='container'>
          <h1>{title}</h1>
          <hr/>
          <h3><FaCalendar /> Due date: {date}</h3>
          <h3><FaGroup /> Organization:{this.state.orgname}</h3>
          <h3><FaEnvelope /> Email:{email}</h3>
          <div className='container'>
            <p style={pstyle}>{description}</p>
          </div>
          <Link className='btn btn-success'>Apply Now!</Link>
      </div>
    )
  }
  render(){
    return(
      <Grid>
          {this.getRecruitmentNote()}
      </Grid>
    )
  }
}
export{RecruitmentNote}
