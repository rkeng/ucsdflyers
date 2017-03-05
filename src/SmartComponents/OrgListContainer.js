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
        console.log(newOrgList);
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
              <Col>
                <OrgList orgs={this.state.orgs}/>
              </Col>
            </Row>
            <NotificationContainer/>
        </Grid>
    )
  }
}

const OrgListContainer = connect()(OrgListContainerPage)

export { OrgListContainer }
