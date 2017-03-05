import React from 'react'
import { Dropzone } from 'react-dropzone'

class DropPicture extends React.Component{

    onDrop (acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
    }

    render() {
      return (
          <div>
            <Dropzone onDrop={this.onDrop}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
      );
    }
}

export {DropPicture}
