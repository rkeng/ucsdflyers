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

  render () {
      return (
          <div>{this.state.topbar}</div>
    );
  }
}

const TopBar = connect()(TopBarSelect)

export { TopBar }
