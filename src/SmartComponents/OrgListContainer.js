import React from 'react'
import { Org } from '../DumbComponents/Org'
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { FaSearch } from 'react-icons/lib/fa'
import { FormControl } from 'react-bootstrap';
import { userAvatar } from '../DumbComponents/Org'
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
        <div>
          <div className='container'>
            <FaSearch />
            <FormControl type="text"
                 placeholder="Search For Orgs"
                 value={this.state.search || ''}
                 onChange={this.filterSearch.bind(this)}/>
            </div>
            <userAvatar/>
            <Org orgs={filteredOrgs}/>
            <NotificationContainer/>
        </div>
    )
  }
}

const OrgListContainer = connect()(OrgListContainerPage)

export { OrgListContainer }
