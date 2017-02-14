import React from 'react';
import { Org } from '../DumbComponents/Org';
import { firebase } from '../FlyersFirebase';

const orgs = [];

var orgRef = firebase.database().ref('clubs/');

class OrgListContainer extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            orgs: []
        }
    }
    

    componentWillMount() {
        //define the dataHandler
        function dataHandler(data) {
            var newOrgList = data.val(); //an array of all orgs
            //The 'this' below refers to the function itself,
            //but we want it to refer to the component OrgListContainer
            this.setState({
                orgs: newOrgList
            })   
        }

        //This will make the "this" in above function refer to the component
        dataHandler = dataHandler.bind(this);

        //define error handler
        function errorHandler(error){
            console.log('error', error.code);
        }

        //call the database
        orgRef.on("value", dataHandler, errorHandler);
    }

    render () {
        return (
            <Org orgs={this.state.orgs}/>
        );
    }
}

export {OrgListContainer};