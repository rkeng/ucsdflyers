import React from 'react';
import { RecruitmentNoteList } from '../DumbComponents/RecruitmentNoteList';
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/lib/fa'

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
          <div>
            <div className='container'>
              <FaSearch />
              <FormControl type="text"
                   placeholder="Search For Notes"/>
            </div>
            <p></p>
            <RecruitmentNoteList recruitmentNotesList={this.state.recruitmentNotesList}/>
            <NotificationContainer/>
            </div>
        );
    }

}
const RecruitmentListContainer = connect()(RecruitmentListContainerPage)
export { RecruitmentListContainer };
