import React from 'react'
import { TopBar } from './TopBar'
import { connect } from 'react-redux'

class FlyersAppForm extends React.Component {
  render () {
    return (
            <div>
                <TopBar/>
                {this.props.children}
            </div>
    )
  }
}

FlyersAppForm.propTypes = {
  children: React.PropTypes.any
}

const FlyersApp = connect()(FlyersAppForm)

export { FlyersApp }
