import React from 'react';
import ReactDOM from 'react-dom';
import { TopBar } from './TopBar';
import {span, ControlLabel, Grid, PageHeader, Jumbotron, Button} from 'react-bootstrap';



class About extends React.Component {

    render(){
        return (
        	<Grid>
			<Jumbotron>
			    <h2><large>About ESL</large></h2>
			    <Grid>
				    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
			    </Grid>

				<br/>


			    <h2>Who Are We</h2>
			    <Grid>
			        <h3><span class="label label-info">Default Label</span></h3>
				    <p><small>Project Manager</small></p>
				    <ControlLabel bsSize="small"><Grid>Xiqiang Lin</Grid></ControlLabel>
				    <p><small>Bussiness Analyst</small></p>
				    <p><small>Senior System Analyst</small></p>
				    <p><small>Software Architect</small></p>
				    <p><small>Software Development Lead</small></p>
				    <p><small>Algorithm Specialist</small></p>
				    <p><small>Database Specialist</small></p>
				    <p><small>Quality Assurance Lead</small></p>
				    <p><small>User Interface Specialist</small></p>
				    <p><small>User Interface Specialist</small></p>
		        </Grid>
		    </Jumbotron>
		    </Grid>
        )
    }
}

export { About };