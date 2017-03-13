import React from 'react';
import { RecruitmentNoteList } from '../DumbComponents/RecruitmentNoteList';
import { connect } from 'react-redux'
import { Grid, Row, Col, DropdownButton, MenuItem, InputGroup } from 'react-bootstrap';
import { SearchBar, compareDueDates, compareClubNames, compareSeekings, compareDueDatesReverse } from '../Commen'

class RecruitmentListContainerPage extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        sortDate: true,
        search: '',
        sortClub: false,
        sortTitle: false
      }
      this.dateSort = this.dateSort.bind(this)
      this.filterSearch = this.filterSearch.bind(this)
      this.clubSort = this.clubSort.bind(this)
      this.titleSort = this.titleSort.bind(this)
    }

    filterSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }

    dateSort(e, time) {
        e.preventDefault();
        this.setState({
          sortDate: !this.state.sortDate,
          sortClub: false,
          sortTitle: false
        })
    }

    clubSort(e){
        e.preventDefault();
        this.setState({
            sortClub: true,
            sortDate: false,
            sortTitle: false
        })
    }

    titleSort(e){
        e.preventDefault();
        this.setState({
            sortClub: false,
            sortDate: false,
            sortTitle: true
        })
    }


    render () {
      //let activeRecruitments = this.props.recruitmentNotes.filter((recruitment) => recruitment.active)
      let filteredRecruitments=this.props.recruitments.filter(
        (recruitment)=>{
          //TODO: after the club is implemented, search by clubName should be here
          return recruitment.seeking.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || recruitment.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || recruitment.clubName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || recruitment.dueDate.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )
        if(this.state.sortDate){
          filteredRecruitments.sort(compareDueDatesReverse)
      }
        else if (this.state.sortClub) {
          // console.log(filteredRecruitments)
          filteredRecruitments.sort(compareClubNames)
          // console.log(filteredRecruitments)
      }
        else if (this.state.sortTitle){
          filteredRecruitments.sort(compareSeekings)
        }
        else{
          filteredRecruitments.sort(compareDueDates)
        }
        const sortByWhat = this.state.sortDate ? 'recent' : 'past'
        const sortBtnName = this.state.sortDate ? 'Most Recent' : 'Farthest Future'


        return (
          <Grid>
            <Row>
              <SearchBar placeholder='search recruitments' value={this.state.search || ''}
                 onChange={this.filterSearch}>
                 <DropdownButton
                   componentClass={InputGroup.Button}
                   id="input-dropdown-addon"
                   title="Sort By"
                 >
                   <MenuItem key="1" onClick={(e)=>this.dateSort(e, {sortByWhat})}>{sortBtnName}</MenuItem>
                   <MenuItem key="2" onClick={(e)=>this.clubSort(e)}>Organization</MenuItem>
                   <MenuItem key="3" onClick={(e)=>this.titleSort(e)}>Title</MenuItem>
                 </DropdownButton>
               </SearchBar>
            </Row>
            <br/>
            <Row>
              <Col>
                <RecruitmentNoteList recruitmentNotesList={filteredRecruitments}/>
              </Col>
            </Row>
          </Grid>
        );
    }
}

RecruitmentListContainerPage.defaultProps = {
    recruitments: []
}

function mapStateToProps(state){
  return {
    recruitments: state.data.recruitments
  }
}

const RecruitmentListContainer = connect(mapStateToProps)(RecruitmentListContainerPage)
export { RecruitmentListContainer };
