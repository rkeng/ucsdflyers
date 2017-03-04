import React from 'react'
import { connect } from 'react-redux'
import { TopBarGuest } from './TopBarGuest';
import { TopBarStudent } from './TopBarStudent';
import { TopBarOrg } from './TopBarOrg';

class TopBarSelect extends React.Component {

  render () {
      const { isAutheticated, isOrg } = this.props;
      var selectedTopBar;
      //select bars
      if(isAutheticated && !isOrg)
        selectedTopBar = <TopBarStudent/>
      else if(isAutheticated && isOrg)
        selectedTopBar = <TopBarOrg/>
      else 
        selectedTopBar = <TopBarGuest/>
      //show bar
      return (
          <div>{selectedTopBar}</div>
    );
  }
}

function mapStateToProps(state){
  return{
    state: state,
    isAutheticated: state.user.isAutheticated,
    isOrg: state.user.isOrg
  }
}

const TopBar = connect(mapStateToProps)(TopBarSelect)

export { TopBar }
