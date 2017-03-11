import React from 'react';
import { RecruitmentNoteList } from '../DumbComponents/RecruitmentNoteList';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { SearchBar } from '../Commen'

class RecruitmentListContainerPage extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        search: ''
      }
      this.filterSearch = this.filterSearch.bind(this)
    }

    filterSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }

    render () {
      let filteredRecruitments=this.props.recruitments.filter(
        (recruitment)=>{
          //TODO: after the club is implemented, search by clubName should be here
          return recruitment.seeking.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || recruitment.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      );
        return (
          <Grid>
            <Row>
              <SearchBar placeholder='search recruitments' value={this.state.search || ''}
                 onChange={this.filterSearch}/>
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
