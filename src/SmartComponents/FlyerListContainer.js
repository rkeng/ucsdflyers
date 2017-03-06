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

      var newFlyersList = that.state.flyers


      newFlyersList.sort(compareDates)

      that.setState({
              flyers: newFlyersList,
              sortDate: false,
              sortClub: false
     })


  }


  componentWillMount () {
    const that = this;

    function isActive (flyer) {
      return flyer.active===true;
    }

    fetchDataAsArray('events')
    .then(function(events){

        var newFlyersList = events.filter(isActive);

        that.setState({
            flyers: newFlyersList,
            sortDate: false,
            sortClub: false
        })
        console.log(this)
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
                    <Button onClick={this.dateSort.bind(this)}> Sort by Date </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button> Sort by Club</Button>
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
