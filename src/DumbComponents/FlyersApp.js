import React from 'react'
import { TopBar } from './TopBar'

class FlyersApp extends React.Component {
  render () {
    return (
            <div>
                <TopBar/>
                {this.props.children}
            </div>
    )
  }
}

FlyersApp.propTypes = {
  children: React.PropTypes.any
}

export { FlyersApp }
