import React from 'react'
import { Image, Col} from 'react-bootstrap'
import AnimakitRotator from 'animakit-rotator';

const members = [
    {
      name: 'Xiqiang Lin',
      role: 'Project Manager',
      intro: 'Stay AWESOME, always.',
      email: 'xil307@ucsd.edu',
      image: require("../asset/xiqiang.jpg"),
      color:'#000000'
    },
    
    {
      name: 'Sheng Zhang',
      role: 'Bussiness Analyst',
      intro: 'If you can dream it, you can do it',
      email: 'shz080@ucsd.edu',
      image: require("../asset/sheng.jpg"),
      color:'#5B2C6F'
    },

    {
      name: 'Ryan Keng',
      role: 'Senior System Analyst',
      intro: 'Genius is one percent inspiration and ninety-nine percent perspiration.',
      email: 'rkeng@ucsd.edu',
      image: require("../asset/ryan.jpg"),
      color:'#000080'
    },

    {
      name: 'Yuqian Cheng',
      role: 'Software Architect',
      intro: 'Every end is a new beginning',
      email: 'yuc259@ucsd.edu',
      image: require("../asset/yuqian.jpg"),
      color: '#E74C3C'
    },

    {
      name: 'Aravind Sridhar',
      role: 'Software Development Lead',
      intro: 'I like to eat with two spoons',
      email: 'aravindsridhar66@gmail.com',
      image: require("../asset/aravind.jpg"),
      color: '#2E86C1'
    },

    {
      name: 'Haoming Wang',
      role: 'Algorithm Specialist',
      intro: 'Stay hungry. Stay foolish(literally).',
      email: 'haw123@ucsd.edu',
      image: require("../asset/haoming.jpg"),
      color:'#008080'
    },

    {
      name: 'Vanna Phong',
      role: 'Database Specialist',
      intro: 'I’m just gonna be me',
      email: 'vphong@ucsd.edu',
      image: require("../asset/vanna.jpg"),
      color: '#F39C12'  
    },

    {
      name: 'Ying Wu',
      role: 'Quality Assurance Lead',
      intro: 'I only have dream when I sleep',
      email: 'yiw273@ucsd.edu',
      image: require("../asset/ying.jpg"),
      color: '#F08080'
    },

    {
      name: 'Jialin Lou',
      role: 'User Interface Specialist',
      intro: '2nd year CS student',
      email: 'jil570@ucsd.edu',
      image: require("../asset/jialin.jpg"),
      color: '#27AE60'
    },

    {
      name: 'Xinrui Zhou',
      role: 'User Interface Specialist',
      intro: 'Let us make difference',
      email: 'x9zhou@ucsd.edu',
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
         this.setState({index:"name"});
       }
       else if(this.state.index === "name"){
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
          const { name, role, intro, email, image, color} = this.props.member

      return(
          <Col xsOffset={1} xs={11} smOffset={1} sm={11} mdOffset={2} md={3}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
      
            <div className="text-center" style={{color: 'white'}} onClick={this.changeFace.bind(this)}>
              <AnimakitRotator side={this.state.index} background={color} shadow>
                <Image key="image" width={300} height={300} alt="" src={image} /><br/>
                <div key="name">
                  <h3> {name} </h3>
                </div>
                <div key="role">
                  <h4>{role}</h4>
                </div>
                <div key="intro">
                  <p>{intro}</p>
                  <br/>
                  <p>{email}</p>
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
      <div>
        {this.renderMembers()}
      </div>
    )
  }
}

export { About }