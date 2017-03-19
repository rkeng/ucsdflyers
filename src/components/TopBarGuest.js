import React from 'react'
import { connect } from 'react-redux'
import { TopBarIcon, TopBarLeft, TopBarRight, NavbarWrapper } from './TopBarElements'
import { Navbar } from 'react-bootstrap'

class TopBarGuestNoState extends React.Component {
  render () {
    return (
        <NavbarWrapper  {...this.props}>
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

const TopBarGuest = connect(mapStateToProps)(TopBarGuestNoState)

export { TopBarGuest }
