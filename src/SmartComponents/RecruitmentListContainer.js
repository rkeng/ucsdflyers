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
            recruitmentNotesList: [],
            search: ""
        }
    }

    filterSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
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

      let filteredNotes=this.state.recruitmentNotesList.filter(
        (recruitmentNote)=>{
          var titles = recruitmentNote.seeking.map((title, index) => {
            return title
          });
          return recruitmentNote.clubName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || titles.toString().toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || recruitmentNote.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        }
      );
        return (
          <div>
            <div className='container'>
              <FaSearch />
              <FormControl type="text"
                   placeholder="Search For Notes"
                   value={this.state.search || ''}
                   onChange={this.filterSearch.bind(this)}/>
            </div>
            <p></p>
            <RecruitmentNoteList recruitmentNotesList={filteredNotes}/>
            <NotificationContainer/>
            </div>
        );
    }

}
const RecruitmentListContainer = connect()(RecruitmentListContainerPage)
export { RecruitmentListContainer };
