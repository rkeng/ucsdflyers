import React from 'react'
import { FlyerList } from '../DumbComponents/FlyerList'
import { connect } from 'react-redux'
import { fetchDataAsArray, stringtoDate, compareDates, compareClubs} from '../models'
import { SearchBar } from '../Commen'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ButtonGroup } from 'react-bootstrap';

class FlyerListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      flyers: [],
      sortDate: false,
      sortClub: false
    }
  }

  clubSort () {
      const that = this;

      fetchDataAsArray('events')
      .then(function(events){
          console.log("reached 1")
          var newFlyersList = events.sort(compareClubs)
          console.log("reached 2")
          console.log(newFlyersList)
          that.setState({
              flyers: newFlyersList,
              sortDate: false,
              sortClub: true
          })
      })
      .catch(function(error){
          NotificationManager.error('Something is wrong', 'Opps!', 2222);
      })
  }

  dateSort () {
      const that = this;

      fetchDataAsArray('events')
      .then(function(events){
          console.log("reached 1")
          var newFlyersList = events.sort(compareDates)
          console.log("reached 2")
          console.log({newFlyersList})
          that.setState({
              flyers: newFlyersList,
              sortDate: true,
              sortClub: false
          })
         console.log("reached 3")
      })
      .catch(function(error){
          NotificationManager.error('Something is wrong', 'Opps!', 2222);
      })
  }


  componentWillMount () {
    const that = this;

    function isActive (flyer) {
      return flyer.active===true;
    }

    fetchDataAsArray('events')
    .then(function(events){
<<<<<<< HEAD
        var newFlyersList = events
        console.log(newFlyersList)
=======
        var newFlyersList = events.filter(isActive);
>>>>>>> refs/remotes/origin/master
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
            <ButtonGroup justified>
                <ButtonGroup>
                    <Button> Sort by Date </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button onClick={this.clubSort}> Sort by Club</Button>
                </ButtonGroup>
            </ButtonGroup>
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
