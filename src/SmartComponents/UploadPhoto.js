import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { FaImage } from 'react-icons/lib/fa'
import { FormGroup, Form, Button, ControlLabel, FormControl } from 'react-bootstrap'
import { firebase } from '../models/FlyersFirebase'
//import * as storage from '@google-cloud/storage'

const dbImagesRef = firebase.database().ref("images");
const storage = firebase.storage();
//console.log(stImagesRef)

class UploadPhotoPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            imagePreviewUrl: ''
        }
        this.selectFile = this.selectFile.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
    }
    
    selectFile(e) {
        e.preventDefault();
        const that = this;
        
        var file = e.target.files[0];
        let reader = new FileReader();
        
        // Check if the file is an image.
        if (file && !file.type.match('image.*')) {
            var data = {
              message: 'You can only share images',
              timeout: 2000
            };
            NotificationManager.error(data.message, "", data.timeout)
            return;
        }
        
        reader.onloadend = () => {
            that.setState({file: file, imagePreviewUrl: reader.result});   
        }
        
        reader.readAsDataURL(file);
    }
    
    uploadPhoto(e) {
        e.preventDefault();
        
        var file = this.state.file;
        
        // add image to db
        dbImagesRef.push({
          imageUrl: "",
          photoUrl: "",
        }).then(function(data) {

          // Upload the image to Firebase Storage.
          var filePath = data.key + '_' + file.name;
          var imageToStorage = storage.ref("event-images/" + filePath).put(file);
            imageToStorage.on('state_changed', function(snapshot) {
                // in-progress state changes
            }, function(error) {
                // unsuccessful upload
            }, function() {
                // successful upload
                data.update({imageUrl: imageToStorage.snapshot.downloadURL})
            }
        )}.bind(this)).catch(function(error) {
          console.error('There was an error uploading a file to Firebase Storage:', error);
        });
        
    }
    
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="img-thumbnail" style={{width: 150, height: "auto"}}/> );
        }
                             
        return(
        
            <Form onSubmit={this.uploadPhoto}>
                <FormGroup controlId="photo">
                    <ControlLabel className="btn btn-default"><FaImage size={60}/>
                        <FormControl type="file" accept="image/*,capture=camera" onChange={this.selectFile} style={{display: "none"}}/>
                    </ControlLabel>
                 </FormGroup>
            
                <Button type="submit" onClick={this.uploadPhoto}>
                    Upload
                </Button>
                <br/>{$imagePreview}
            </Form>
        
        );
    }
}

export { UploadPhotoPage };