import React from 'react'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router'

const wellStyles = {maxWidth: 520, margin: '0 auto 20px'}

class Register extends React.Component {
  render () {
    return (
            <div>
                <h1> <center> Register As: </center> </h1>
                <hr/>
                <div className="well" style={wellStyles}>
                    <Link to='register-student'>
                        <Button bsStyle="primary" bsSize="large" block> Student </Button>
                    </Link>
                    <hr/>
                    <Link to='register-org'>
                        <Button bsStyle="primary" bsSize="large" block> Student Organization </Button>
                    </Link>
                </div>
            </div>
    )
  }
}

export { Register }
