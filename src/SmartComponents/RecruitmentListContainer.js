import React from 'react';
import { RecruitmentNoteList } from '../DumbComponents/RecruitmentNoteList';
import { firebase } from '../FlyersFirebase';

// dummy data
const recruitmentNotes = [
    {name: 'Alpha Phi Omega', date: 'Feb 20, 2017', title: 'VP of Finance', description: 'Looking for talented individuals'},
    {name: 'Hack Day', date: 'Jan 31, 2017', title: 'CSE building', description: 'Hack into others computer'},
    {name: 'Water Fun', date: 'Feb 02, 2017', title: 'Sun God', description: 'Get wet and swag'}
];

class RecruitmentListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            recruitmentNotes: []
        }
    }

    componentWillMount() {
        firebase.database().ref().child('recruitmentNotes').on('child_added', (recruitmentNote) => {
            console.log('myrecruitmentNote', recruitmentNote);
            this.state.recruitmentNotes.push(recruitmentNotes);
        })
    }

    render () {
        return (
            <RecruitmentNoteList recruitmentNotes={recruitmentNotes}/>
        );
    }

}

export { RecruitmentListContainer };
