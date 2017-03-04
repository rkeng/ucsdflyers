import React from 'react'
import { OrgList } from '../DumbComponents/OrgList'
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { FaSearch } from 'react-icons/lib/fa'
import { FormControl } from 'react-bootstrap';

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
        <div>
          <div className='container'>
            <FaSearch />
            <FormControl type="text"
                 placeholder="Search For Orgs"/>
            </div>
            <OrgList orgs={this.state.orgs}/>
            <NotificationContainer/>
        </div>
    )
  }
}

const OrgListContainer = connect()(OrgListContainerPage)

export { OrgListContainer }
