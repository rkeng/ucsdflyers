import React from 'react';
import ReactDOM from 'react-dom';
import { TopBar } from './TopBar';
import {Thumbnail, ListGroupItem, ListGroup, span, ControlLabel, Grid, PageHeader, Jumbotron, Button} from 'react-bootstrap';



class About extends React.Component {


    render(){

        return (

        	<Grid>
				<Jumbotron>
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
						    <ListGroupItem>
						    	<br/>
						        <center>
						        <img alt="..." width="120" height="130" src="pikachu.png"/>
						        </center>
						        <ul class="name">
						            <h3><strong>PROJECT MANAGER</strong></h3>
							    	<ul><h4><em><large>Xiqiang Lin</large></em></h4></ul>
									  <ul><ul><p><em><small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself</small></em></p></ul></ul>
								</ul>
						    </ListGroupItem>

						    <ListGroupItem header="Bussiness Analyst">
						    	<ul class="name">
						    		<h4><em>Sheng Zhang</em></h4>
						    		<ul class="list-group">
									  <li class="list-group-item"><small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself,One or two or whatever sentences to introduce yourself!</small></li>
									</ul>
								</ul>
						    </ListGroupItem>

						    <ListGroupItem header="Senior System Analyst">
							    <ul class="name">
							    	<h4><em>Ryan Keng</em></h4>
							    	<ul class="list-group">
									  <li class="list-group-item"><small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself!</small></li>
									</ul>
								</ul>
						    </ListGroupItem>

						    <ListGroupItem header="Software Architect">
						    	<ul class="name">
							    	<h4><em>Yuqian Cheng</em></h4>
							    	<ul class="list-group">
									  <li class="list-group-item"><small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself!</small></li>
									</ul>
								</ul>
						    </ListGroupItem>

						    <ListGroupItem header="Software Development Lead">
						    	<ul class="name">
							    	<h4><em>Aravind Sridhar</em></h4>
							    	<ul class="list-group">
									  <li class="list-group-item"><small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself!</small></li>
									</ul>
								</ul>
						    </ListGroupItem>

						    <ListGroupItem header="Algorithm Specialist">
						    	<ul class="name">
							    	<h4><em>Haoming Wang</em></h4>
							    	<ul class="list-group">
									  <li class="list-group-item"><small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself!</small></li>
									</ul>
								</ul>	
						    </ListGroupItem>

						    <ListGroupItem header="Database Specialist">
						    	<ul class="name">
							    	<h4><em>Vanna Phong</em></h4>
							    	<ul class="list-group">
									  <li class="list-group-item"><small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself!</small></li>
									</ul>
								</ul>
						    </ListGroupItem>

						    <ListGroupItem header="Quality Assurance Lead">
						    	<ul class="name">
							    	<h4><em>Ying Wu</em></h4>
							    	<ul class="list-group">
									  <li class="list-group-item"><small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself!</small></li>
									</ul>
								</ul>
						    </ListGroupItem>

						    <ListGroupItem header="User Interface Specialist">
						    	<ul class="name">
							    	<h4><em>Jialin Lou</em></h4>
							    	<ul class="list-group">
									  <li class="list-group-item"><small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself!</small></li>
									</ul>
								</ul>
						    </ListGroupItem>

						    <ListGroupItem header="User Interface Specialist">
						    	<ul class="name">
							    	<h4><em>Xinrui Zhou</em></h4>
							    	<ul class="list-group">
									  <li class="list-group-item"><small>One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself, One or two or whatever sentences to introduce yourself!</small></li>
									</ul>
								</ul>
						    </ListGroupItem>

						</ListGroup>
					</Grid>
			    </Jumbotron>
		    </Grid>
        )
    }
}

export { About };