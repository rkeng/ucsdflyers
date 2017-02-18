import React from 'react';
import { Org } from '../DumbComponents/Org';
import { firebase } from '../FlyersFirebase';

var orgRef = firebase.database().ref('clubs/');

class OrgListContainer extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            orgs: []
        }
    }

    componentWillMount() {
        const that = this;
        orgRef.on("value", function (data) {
            var orgList = data.val();
            console.log(orgList);
            that.setState({orgs: orgList});
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }

    render () {
        return (
            <Org orgs={this.state.orgs}/>
        );
    }
}

export {OrgListContainer};