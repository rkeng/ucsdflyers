import React from 'react'
import { Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { TopBarIcon, TopBarLeft, TopBarRight } from './TopBarElements'

class TopBarStudentNoState extends React.Component {

  render () {
    return (
        <Navbar collapseOnSelect fixedTop>
            <TopBarIcon/>
            <Navbar.Collapse>
                <TopBarLeft/>
                <TopBarRight/>
            </Navbar.Collapse>
        </Navbar>
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
