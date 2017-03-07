import React from 'react';
import { RecruitmentNoteList } from '../DumbComponents/RecruitmentNoteList';
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'

// dummy data
// const recruitmentNotesList = [
//     {name: 'Alpha Phi Omega', date: 'Feb 20, 2017', title: 'VP of Finance', description: 'Looking for talented individuals'},
//     {name: 'Hack Day', date: 'Jan 31, 2017', title: 'CSE building', description: 'Hack into others computer'},
//     {name: 'Water Fun', date: 'Feb 02, 2017', title: 'Sun God', description: 'Get wet and swag'}
// ];
import { Grid, Row, Col } from 'react-bootstrap';
import { SearchBar } from '../Commen'

class RecruitmentListContainerPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            recruitmentNotesList: []
        }
    }

    componentWillMount () {
      const that = this;

      fetchDataAsArray('recruitmentNotes')
      .then(function(recruitmentNotes){
          that.setState({
              recruitmentNotesList: recruitmentNotes
          })
      })
      .catch(function(error){
          NotificationManager.error('Something is wrong', 'Opps!', 2222);
      })
    }


    render () {
        return (
          <Grid>
            <Row>
                <SearchBar/>
            </Row>
            <Row>
              <Col>
                <RecruitmentNoteList recruitmentNotesList={this.state.recruitmentNotesList}/>
              </Col>
            </Row>
            <NotificationContainer/>
          </Grid>
        );
    }

}
const RecruitmentListContainer = connect()(RecruitmentListContainerPage)
export { RecruitmentListContainer };
