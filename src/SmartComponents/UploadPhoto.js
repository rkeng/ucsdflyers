import React from 'react';
import { NotificationManager } from 'react-notifications'
import { FaImage, FaClose } from 'react-icons/lib/fa'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { firebase } from '../models/FlyersFirebase'
import { uploadPhotos } from '../models/index.js'
import Dropzone from 'react-dropzone'
//import * as storage from '@google-cloud/storage'

// should point to <endpoint>/images/
const dbImagesRef = firebase.database().ref("images");
const storage = firebase.storage();


class UploadPhotoPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            preview: {
                file: null,
                imagePreviewUrl: null
            },
            uploadProgress: null,
            files: [],
            currentUser: null
        }
        this.deleteFile = this.deleteFile.bind(this);
        this.upload = this.upload.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentWillMount() {
        const that = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                that.setState({currentUser: user})
                console.log(user)
            }
        })
    }

    // upload(e) {
    //     e.preventDefault();
    //
    //     const that = this
    //     console.log(storage)
    //     let filePath = that.state.currentUser.uid + '/events/'
    //     uploadPhotos(dbImagesRef, filePath, that.state.files)
    //
    //
    // }

    onDrop (files) {
        const that = this;
        that.setState({files: files})
        console.log('Received files: ', files);
    }

    deleteFile(file, key) {
        const that = this;
        that.setState({files: that.state.files.filter((_, i) => i !== key)});
    }

    render() {
        let previews = this.state.files.map((file, index) => (
            <div className="pull-left img-thumbnail" style={{width: 125, position: "relative"}} key={index}>
                <Button style={{position: "absolute", top: 3, right: 3, width: 25, height: 25, padding: 0}} bsStyle="danger" bsSize="xsmall" onClick={() => this.deleteFile(file,index)}>
                    <FaClose size={20}/>
                </Button>
                <img src={file.preview} style={{width: 125, height: "auto"}} alt={file.name}/>
            </div>
        ))

        return(

                <Row>
                <Col sm={4}>
                <Dropzone onDrop={this.onDrop} accept={"image/*"} style={{width: "auto", border: "2px solid #ccc", borderRadius: 3, backgroundColor: "#eee", paddingBottom: 10}}>
                  <div className="text-center">
                    <FaImage size={100}/>
                    <br/>Drop images or click to select them here.</div>
                </Dropzone>
                </Col>
                {this.state.files != null ?
                    <Col sm={8}>{previews}</Col>
                    : null
                }
                </Row>

        );
    }
}

export { UploadPhotoPage };
