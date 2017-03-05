import React from 'react'
import { Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { TopBarIcon, TopBarLeft, TopBarRight, NavbarWrapper } from './TopBarElements'


class TopBarOrgNoState extends React.Component {

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

const TopBarOrg = connect()(TopBarOrgNoState)

export { TopBarOrg }