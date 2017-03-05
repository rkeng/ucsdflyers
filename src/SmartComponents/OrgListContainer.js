import React from 'react'
import { OrgList } from '../DumbComponents/OrgList'
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { FaSearch } from 'react-icons/lib/fa'
import { FormControl } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from 'react-spinkit';

class OrgListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      orgs: [],
      hasMoreItems: true
    }
  }

  componentWillMount () {
    const that = this;
    fetchDataAsArray('clubs')
    .then(function(clubs){
        var newOrgList = clubs
        that.setState({
            orgs: newOrgList,
            hasMoreItems: false
        })
    })
    .catch(function(error){
        NotificationManager.error('Something is wrong', 'Opps!', 2222);
    })
  }

  render () {
    const spinner = <span><Spinner spinnerName="three-bounce" /></span>
    return (
        <div>
          <div className='container'>
            <FaSearch />
            <FormControl type="text"
                 placeholder="Search For Orgs"/>
            <h1>UCSD Student Orgs</h1>
            <p>Click on the orgs to see details.</p>
            <hr/>

            <InfiniteScroll
                pageStart={0}
                loadMore={this.componentWillMount.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={spinner}>
                <OrgList orgs={this.state.orgs}/>
            </InfiniteScroll>
          </div>
            <NotificationContainer/>
        </div>
    )
  }
}

const OrgListContainer = connect()(OrgListContainerPage)

export { OrgListContainer }
