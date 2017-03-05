import React from 'react';
import { RecruitmentNoteList } from '../DumbComponents/RecruitmentNoteList';
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Grid, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/lib/fa'
import { ColCenter, SearchBar } from '../Commen'

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
          var newRecruitmentList = recruitmentNotes
          that.setState({
              recruitmentNotesList: newRecruitmentList
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
