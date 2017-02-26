import React from 'react'
import { connect } from 'react-redux'
import { onAuthStateChanged } from '../models'
import { TopBarGuest } from './TopBarGuest';
import { TopBarStudent } from './TopBarStudent';
// import { TopBarOrg } from './TopBarOrg';

class TopBarSelect extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        topbar: <TopBarGuest/>
    }
  }

  componentWillMount(){
    const that = this;
    onAuthStateChanged(function(user) {
        if (user) {
            if(!user.emailVerified) {
                user.sendEmailVerification().then(function() {
                    console.log('Email sent.');
                }, function(error) {
                    console.log('An error happened.');
                });
            } else {
                that.setState({
                    topbar: <TopBarStudent/>
                })
            }
        } else {
            that.setState({
                topbar: <TopBarGuest/>
            })
        }
    })
  }

<<<<<<< HEAD
                <Navbar.Collapse>
                    <Nav>
                        <NavItem onClick={this.changeRoute} id='events'>Flyers</NavItem>
                        <NavItem onClick={this.changeRoute} id='org'>Organizations</NavItem>
                        <NavItem onClick={this.changeRoute} id='about'>About Us</NavItem>
                        <NavItem onClick={this.changeRoute} id='recruitments'>Recruitment Notes</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem onClick={this.changeRoute} id='login'>Login</NavItem>
                        <NavItem onClick={this.changeRoute} id='register'>New User</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
=======
  render () {
      return (
          <div>{this.state.topbar}</div>
    );
  }
>>>>>>> df42135baa79ef919e818d0fe1815925b8630f7f
}

const TopBar = connect()(TopBarSelect)

export { TopBar }
