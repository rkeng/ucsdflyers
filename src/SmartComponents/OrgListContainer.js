import React from 'react'
import { OrgList } from '../DumbComponents/OrgList'
import { connect } from 'react-redux'
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
        </Grid>
    )
  }
}

const OrgListContainer = connect()(OrgListContainerPage)

export { OrgListContainer }
