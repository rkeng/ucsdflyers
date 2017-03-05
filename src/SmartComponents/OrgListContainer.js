import React from 'react'
import { Org } from '../DumbComponents/Org'
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { FaSearch } from 'react-icons/lib/fa'
import { FormControl, Grid, Row, Col } from 'react-bootstrap';
import { ColCenter, SearchBar } from '../Commen'

class OrgListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      orgs: []
    }
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
    return (
        <Grid>
            <Row>
              <SearchBar placeholder='search orgs'/>
            </Row>
              <Col>
                <Org orgs={this.state.orgs}/>
              </Col>
            <NotificationContainer/>
        </Grid>
    )
  }
}

const OrgListContainer = connect()(OrgListContainerPage)

export { OrgListContainer }
