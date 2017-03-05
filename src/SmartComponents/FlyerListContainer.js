import React from 'react'
import { FlyerList } from '../DumbComponents/FlyerList'
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { ColCenter, SearchBar } from '../Commen'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { FormControl, Grid, Row, Col, FormGroup, ControlLabel, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/lib/fa'

class FlyerListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      flyers: []
    }
  }

  componentWillMount () {
    const that = this;

    fetchDataAsArray('events')
    .then(function(events){
        var newFlyersList = events
        that.setState({
            flyers: newFlyersList
        })
    })
    .catch(function(error){
        NotificationManager.error('Something is wrong', 'Opps!', 2222);
    })
  }

  render () {
    return (
        <Grid>
          <NotificationContainer/>
          <Row>
            <SearchBar placeholder='search for flyers'/>
         </Row>
         <Row>
           <Col>
              <FlyerList flyers={this.state.flyers}/>
            </Col>
          </Row>
        </Grid>
    )
  }
}

const FlyerListContainer = connect()(FlyerListContainerPage)

export { FlyerListContainer }
