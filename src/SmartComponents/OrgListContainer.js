import React from 'react';
import { Org } from '../DumbComponents/Org';
import { firebase } from '../FlyersFirebase';

const orgs = [];

var orgRef = firebase.database().ref('clubs/');

class OrgListContainer extends React.Component {
    /*
    constructor(props){
        super(props);
        this.state = {
            orgs: []
        }
    }
    */

    componentWillMount() {
        orgRef.on("child_added", function (data) {
            var newOrg = data.val();
            var obj = {
                name: newOrg.name,
                description: newOrg.description
            }
            orgs.push(obj);
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }

    render () {
        return (
            <Org orgs={orgs}/>
        );
    }
}

export {OrgListContainer};