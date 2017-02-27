import React from 'react'
import { connect } from 'react-redux'
import { onAuthStateChanged } from '../models'
import { TopBarGuest } from './TopBarGuest';
import { TopBarStudent } from './TopBarStudent';
import { LoginUserAction, LogoutUserAction } from '../State/actions'
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
    const { dispatch } = this.props;
    onAuthStateChanged(function(user) {
        if (user) {
            that.setState({
                topbar: <TopBarStudent/>
            })
            dispatch(LoginUserAction())
        } else {
            that.setState({
                topbar: <TopBarGuest/>
            })
            dispatch(LogoutUserAction())
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
