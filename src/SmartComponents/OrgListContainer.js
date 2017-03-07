import React from 'react'
import { OrgList } from '../DumbComponents/OrgList'
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Grid, Row, Col } from 'react-bootstrap';
import { SearchBar } from '../Commen'

class OrgListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      orgs: [],
      search: ''
    }
  }

  filterSearch(event){
      this.setState({search: event.target.value.substr(0,20)});
  }

  componentWillMount () {
    const that = this;
    fetchDataAsArray('clubs')
    .then(function(clubs){
        var newOrgList = clubs
        that.setState({
            orgs: newOrgList
        })
    })
    .catch(function(error){
        NotificationManager.error('Something is wrong', 'Opps!', 2222);
    })
  }

  render () {
    let filteredOrgs=this.state.orgs.filter(
      (org)=>{
        return org.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || org.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );

    return (
        <Grid>
            <Row>
                <SearchBar placeholder='search orgs' value={this.state.search || ''}
                   onChange={this.filterSearch.bind(this)}/>
              <Col>
                  <OrgList orgs={filteredOrgs}/>
              </Col>
            </Row>
            <NotificationContainer/>
        </Grid>
    )
  }
}

const OrgListContainer = connect()(OrgListContainerPage)

export { OrgListContainer }
