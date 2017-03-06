import React from 'react'
import { FormGroup, Form, ControlLabel, FormControl, Grid,Row, Col, PageHeader, Modal } from 'react-bootstrap'
import { Button, Panel } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import DatePicker from 'react-bootstrap-date-picker';
import { createNew, getCurrentUser, uploadImages } from '../models/index.js';
import { ImageDropzone } from './ImageDropzone.js'

class CreateFlyer extends React.Component {
  constructor (props) {
    super(props)
    this.onPreview = this.onPreview.bind(this);
    this.onCreate = this.onCreate.bind(this);

    this.state = {
      show: false,
        title: "",
        date: new Date().toISOString(),
        time: "",
        description: "",
        location: "",
        files: "",

    }
  }

  onPreview(event){
    event.preventDefault();
    this.setState({ show: true})

    const title = findDOMNode(this.title).value;
    this.setState({ title: title  })
    const time = findDOMNode(this.time).value;
    this.setState({ time: time })
    const description = findDOMNode(this.description).value;
    this.setState({ description: description })
    const location = findDOMNode(this.location).value;
    this.setState({ location: location})

  }

  onCreate(event){
    event.preventDefault();

    getCurrentUser().then((club) => {
      const clubID = club.uid;
      console.log('clubID' + clubID);
      const flyer = {
        title: findDOMNode(this.title).value,
        time: findDOMNode(this.time).value,
        description: findDOMNode(this.description).value,
        location: findDOMNode(this.location).value,
        date: this.state.date.substring(0,10),
        clubID: clubID,
        images: {}
      }
      let flyerID = createNew('events',flyer)

      // image uploading
      let files = this.refs.dropzone.state.files
      uploadImages("events", flyerID, clubID, files)
    })
  }



  getFlyer () {
      var ourDate = this.state.date
      var x = ourDate.substring(0,10)

      return
        <Panel key={this.state.title} bsStyle='success'
            header={this.state.title}>
          <h3>{this.state.title}</h3>
            <p>
              Date: {x} <br />
              Time: {this.state.time}<br />
              Description: {this.state.description}<br />
              Location: {this.state.location}
            </p>
        </Panel>
  }




  render() {
    return (
      <Grid>
        <Row className="create-flyer">
          <Col md={8} mdOffset={2}>

          <PageHeader>Create Event <small>Name of club</small></PageHeader>

          <Form>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>

              <FormControl
                type="text"
                placeholder="Enter title"
                ref={(node) => {this.title = node}}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Date</ControlLabel>
              <DatePicker onChange={this.handleChange} value={this.state.date} />
              <ControlLabel>Time</ControlLabel>

              <FormControl
                type="text"
                placeholder="Enter time"
                ref={(node) => {this.time = node}}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter description"
                ref={(node) => {this.description = node}}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Location</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter location"
                ref={(node) => {this.location = node}}
              />
              <FormControl.Feedback />
            </FormGroup>

            <ImageDropzone ref="dropzone"/>
            <Button onClick={this.handleChange}> files</Button>
          </Form>
        </Col>
      </Row>

      <br/>

      <Row className="newButton">
        <Col md={1} mdOffset={2}>
          <Button
            bsStyle="primary"
            bsSize="small"
            onClick={this.onCreate}>CreateFlyer
          </Button>
        </Col>

        <Col md={1} mdPush={1}>
          <Button
            bsStyle="success"
            bsSize="small"
            onClick={this.onPreview} >Preview flyer page
          </Button>
{/*
          <FileUpload
            allowedFileTypes={['jpg', 'pdf']}
            data={{ type: 'picture' }}
            dropzoneId="fileUpload"
            url="https:/url.org/api/docs/upload"
          >
            <button>
              Click or drag here
            </button>
          </FileUpload>

          <div>
          <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <button type="button" onClick={this.onOpenClick}>
                    Open Dropzone
                </button>
                {this.state.files.length > 0 ? <div>
                <h2>Uploading {this.state.files.length} files...</h2>
                <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
                </div> : null}
          </div>*/}

          <Modal show={this.state.show} onHide={this.close}>
          {/*
            ..Import..
            <Flyer flyer={this.state.flyer}/>
          */}

            <Modal.Body>
                <div> { this.getFlyer() } </div>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={() => this.setState({show: false})}>Close</Button>
            </Modal.Footer>
          </Modal>

        </Col>
      </Row>

      <br/>
      <br/>
      <br/>

    </Grid>

    );
  }
}


export { CreateFlyer }
