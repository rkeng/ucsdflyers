import React from 'react'
import { OrgList } from './OrgList'
import { connect } from 'react-redux'
import { Grid, Row, Pagination } from 'react-bootstrap';
import { SearchBar, ColCenter } from '../commons'

class OrgListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      search: '',
      activePage: 1
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.filterSearch = this.filterSearch.bind(this)
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  filterSearch(event){
      this.setState({
        search: event.target.value,
        activePage: 1
      });
  }

  render () {
    let numOfOrgsPerPage = 50
    const { activePage } = this.state
    let startOrgIndex = (activePage - 1) * numOfOrgsPerPage
    let endOrgIndex = startOrgIndex + numOfOrgsPerPage

    let filteredOrgs=this.props.orgs.filter(
      (org)=>{
        return org.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || org.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )

    let pagedOrgs = filteredOrgs.slice(startOrgIndex,endOrgIndex);

    let pageNumber = filteredOrgs.length / numOfOrgsPerPage

    return (
        <Grid>
            <Row>
                <SearchBar placeholder='search orgs' value={this.state.search || ''}
                   onChange={this.filterSearch}/>
            </Row>
            <Row>
              <ColCenter>
                <h1>UCSD Student Orgs</h1>
                <p>Click to see details of the org</p>
                <Pagination
                  ellipsis
                  boundaryLinks
                  items={Math.floor(pageNumber) || 1}
                  maxButtons={3}
                  activePage={this.state.activePage}
                  onSelect={this.handleSelect} 
                  />
              </ColCenter>
              <hr/>
            </Row>
            <Row>
                <OrgList orgs={pagedOrgs}/>
            </Row>
        </Grid>
    )
  }
}

OrgListContainerPage.defaultProps = {
    orgs: []
}

function mapStateToProps(state){
  return {
    orgs: state.data.orgs
  }
}

const OrgListContainer = connect(mapStateToProps)(OrgListContainerPage)

export { OrgListContainer }
