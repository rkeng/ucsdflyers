import React from 'react'
import { connect } from 'react-redux'
import { TopBarIcon, TopBarLeft, TopBarRight } from './TopBarElements'
import { Navbar } from 'react-bootstrap'

class TopBarGuestNoState extends React.Component {
  render () {
    return (
        <div>
            <Navbar collapseOnSelect fixedTop>
                <TopBarIcon/>
                <Navbar.Collapse>
                    <TopBarLeft/>
                    <TopBarRight/>
                </Navbar.Collapse>
            </Navbar>
        </div>
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
