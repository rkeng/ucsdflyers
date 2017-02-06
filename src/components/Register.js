import React from 'react';
import {Button} from 'react-bootstrap';


const wellStyles = {maxWidth: 520, margin: '0 auto 20px'};

class Register extends React.Component{
    render(){
        return(
            <div>
                <h1> <center> Register As: </center> </h1>
                <hr/>
                <div className="well" style={wellStyles}>
                    <Button bsStyle="primary" bsSize="large" block> New Student </Button>
                    <Button bsStyle="primary" bsSize="large" block> New Student Organization </Button>
                </div>
            </div>
        )
    }
}


export { Register };
