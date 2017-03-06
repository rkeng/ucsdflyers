import React from 'react';
import { RecruitmentNoteList } from '../DumbComponents/RecruitmentNoteList';
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Grid, Row, Col } from 'react-bootstrap';
import { SearchBar } from '../Commen'
import { Loader } from '../DumbComponents/Loader'
class RecruitmentListContainerPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            recruitmentNotesList: [],
            loading: true
        }
    }

    componentDidMount() {
      setTimeout(() => this.setState({ loading: false }),2000);
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
      if(this.state.loading)
      return <Loader />
      else{
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

}
const RecruitmentListContainer = connect()(RecruitmentListContainerPage)
export { RecruitmentListContainer };
