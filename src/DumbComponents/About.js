import React from 'react'
import { Image, Col} from 'react-bootstrap'
// import RED from '../asset/RED.jpg'
import AnimakitRotator from 'animakit-rotator';

const members = [
    {
      name: 'Xiqiang Lin',
      role: 'Project Manager',
      intro: 'Hello World!',
      image: require("../asset/xiqiang.jpg"),
      color:'#000000'
    },
    
    {
      name: 'Sheng Zhang',
      role: 'Bussiness Analyst',
      intro: 'Hello World!',
      image: require("../asset/sheng.jpg"),
      color:'#5B2C6F'
    },

    {
      name: 'Ryan Keng',
      role: 'Senior System Analyst',
      intro: 'Hello World!',
      image: require("../asset/ryan.jpg"),
      color:'#000080'
    },

    {
      name: 'Yuqian Cheng',
      role: 'Software Architect',
      intro: 'Hello World!',
      image: require("../asset/yuqian.jpg"),
      color: '#E74C3C'
    },

    {
      name: 'Aravind Sridhar',
      role: 'Software Development Lead',
      intro: 'Hello World!',
      image: require("../asset/aravind.jpg"),
      color: '#2E86C1'
    },

    {
      name: 'Haoming Wang',
      role: 'Algorithm Specialist',
      intro: 'Hello Wolrd!',
      image: require("../asset/haoming.jpg"),
      color:'#008080'
    },

    {
      name: 'Vanna Phong',
      role: 'Database Specialist',
      intro: 'Hello World!',
      image: require("../asset/vanna.jpg"),
      color: '#F39C12'  
    },

    {
      name: 'Ying Wu',
      role: 'Quality Assurance Lead',
      intro: 'Hello World!',
      image: require("../asset/ying.jpg"),
      color: '#F08080'
    },

    {
      name: 'Jialin Lou',
      role: 'User Interface Specialist',
      intro: 'Hello World!',
      image: require("../asset/jialin.jpg"),
      color: '#27AE60'
    },

    {
      name: 'Xinrui Zhou',
      role: 'User Interface Specialist',
      intro: 'Hello World!',
      image: require("../asset/arow.jpg"),
      color:'#581845'
    },
]

class InfoCard extends React.Component{

    constructor (props) {
      super(props)
      this.state={
        index:"image"
      }
    }

    changeFace(event) {
       if(this.state.index === "image"){
         this.setState({index:"role"});
       }
       else if(this.state.index === "role"){
         this.setState({index:"intro"});
       }
       else{
         this.setState({index:"image"});
       }

    }
   render(){
          const { role, intro, image, color} = this.props.member
      return(

        <Col sm={6} mdOffset={2} md={3}>
          <br/>
          <br/>
          <br/>
          <br/>
          <div className="text-center">
            <AnimakitRotator side={this.state.index} background={color} shadow>
              <Image key="image" onClick={this.changeFace.bind(this)} width={300} height={300} alt="" src={image} /><br/>
              <div key="role" onClick={this.changeFace.bind(this)}>
                <h3>{role}</h3>
              </div>
              <div key="intro" onClick={this.changeFace.bind(this)}>
                <p>{intro}</p>
              </div>
            </AnimakitRotator>
          </div>
        </Col>

      )
   }
}

class About extends React.Component{
  renderMembers() {     
    return members.map((member, index) => {      
      return(  
        <InfoCard key={index} member={member}/>
      )
    })
  }

  render() {
    return(
      <div> {this.renderMembers()}</div>
    )
  }
}

export { About }