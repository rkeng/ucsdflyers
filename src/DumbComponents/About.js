import React from 'react'
import { ListGroupItem, ListGroup, Grid, Jumbotron } from 'react-bootstrap'
import { connect } from 'react-redux'
import logo from './logo.png'

class AboutPage extends React.Component {

  render(){

    return (
      <Grid>        
        <Jumbotron>
          <div className="row text-center">
            <img width={400} height={400} src={logo} className="rounded mx-auto d-block" alt=""/>
          </div>
          <h2><strong>About ESL</strong></h2>
          <br/>
        
          <Grid>
            <ListGroupItem>
                <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information. This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information. This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            </ListGroupItem>
          </Grid>

          <br/>
          <br/>         
          <br/>

          <h2><strong>Who Are We</strong></h2>
          <br/>
          <Grid>
            <ListGroup>
              <ListGroupItem header="Project Manager">
                  <u><em>Xiqiang Lin</em></u>
                  <br/>
                  <small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small>
              </ListGroupItem>
              <ListGroupItem header="Bussiness Analyst">
                  <u><em>Sheng Zhang</em></u>
                  <br/>
                  <small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small>
              </ListGroupItem>
              <ListGroupItem header="Senior System Analyst">
                  <u><em>Ryan Keng</em></u>
                  <br/>
                  <small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small>
              </ListGroupItem>
              <ListGroupItem header="Software Architect">
                  <u><em>Yuqian Cheng</em></u>
                  <br/>
                  <small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small>
              </ListGroupItem>
              <ListGroupItem header="Software Development Lead">
                  <u><em>Aravind Sridhar</em></u>
                  <br/>
                  <small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small>
              </ListGroupItem>
              <ListGroupItem header="Algorithm Specialist">
                  <u><em>Haoming Wang</em></u>
                  <br/>
                  <small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small>
              </ListGroupItem>
              <ListGroupItem header="Database Specialist">
                  <u><em>Vanna Phong</em></u>
                  <br/>
                  <small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small>
              </ListGroupItem>
              <ListGroupItem header="Quality Assurance Lead">
                  <u><em>Ying Wu</em></u>
                  <br/>
                  <small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small>
              </ListGroupItem>
              <ListGroupItem header="User Interface Specialist">
                  <u><em>Jialin Lou</em></u>
                  <br/>
                  <small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small>
              </ListGroupItem>
              <ListGroupItem header="User Interface Specialist">
                  <u><em>Xinrui Zhou</em></u>
                  <br/>
                  <small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small>
              </ListGroupItem>

              </ListGroup>
              </Grid>

        </Jumbotron>
      </Grid>
    )
  }
}
const About = connect()(AboutPage)

export { About }