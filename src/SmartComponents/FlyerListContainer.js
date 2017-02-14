import React from 'react';
import { FlyerList } from '../DumbComponents/FlyerList';
import { firebase } from '../FlyersFirebase';

// dummy data
const flyers = [
    {name: 'p Day', date: 'Feb 20, 2017', location: 'PC', description: 'Everyone handout to catch pokemons'},
    {name: 'Hack Day', date: 'Jan 31, 2017', location: 'CSE building', description: 'Hack into others computer'},
    {name: 'Water Fun', date: 'Feb 02, 2017', location: 'Sun God', description: 'Get wet and swag'}
];

class FlyerListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            flyers: []
        }
    }

    componentWillMount() {
        firebase.database().ref('flyers/').on('child_added', (flyer) => {
            this.state.flyers.push(flyer);
        })
    }

    render () {
        return (
            <FlyerList flyers={flyers}/>
        );
    }

}

export { FlyerListContainer };
