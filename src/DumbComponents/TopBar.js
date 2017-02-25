import React from 'react'
import { onAuthStateChanged } from '../models'
import { TopBarGuest } from './TopBarGuest';
import { TopBarStudent } from './TopBarStudent';
import { connect } from 'react-redux'
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
            that.setState({
                topbar: <TopBarStudent/>
            })
        } else {
            that.setState({
                topbar: <TopBarGuest/>
            })
        }
    })
  }

  render () {
      return <div>{this.state.topbar}</div>
  }
}

const TopBar = connect()(TopBarSelect)

export { TopBar }
