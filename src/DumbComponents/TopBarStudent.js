import React from 'react'
import { Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { TopBarIcon, TopBarLeft, TopBarRight, NavbarWrapper } from './TopBarElements'

class TopBarStudentNoState extends React.Component {

  render () {
    return (
        <NavbarWrapper {...this.props}>
            <TopBarIcon/>
            <Navbar.Collapse>
                <TopBarLeft/>
                <TopBarRight/>
            </Navbar.Collapse>
        </NavbarWrapper>
    )
  }
}

function mapStateToProps(state){
    return {
        state: state
    }
}

const TopBarStudent = connect(mapStateToProps)(TopBarStudentNoState)

export { TopBarStudent }