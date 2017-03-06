import React from 'react'
import { OrgList } from '../DumbComponents/OrgList'
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Grid, Row, Col } from 'react-bootstrap';
import { SearchBar } from '../Commen'
import { Loader } from '../DumbComponents/Loader'
class OrgListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      orgs: [],
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }),2000);
  }

  componentWillMount () {
    const that = this;

    fetchDataAsArray('clubs')
    .then(function(clubs){
        var newOrgList = clubs
        that.setState({
            orgs: newOrgList,
        })
        console.log(newOrgList);
    })
    .catch(function(error){
        NotificationManager.error('Something is wrong', 'Opps!', 2222);
    })
  }

  render () {
    if(this.state.loading)
    return(<Loader />)
    else{
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
}

const OrgListContainer = connect()(OrgListContainerPage)

export { OrgListContainer }
