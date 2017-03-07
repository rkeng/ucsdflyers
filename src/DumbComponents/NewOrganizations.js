import React from 'react'
import { Modal } from 'react-bootstrap'
import logo from '../asset/logo.png'
import { OrgLogin } from './OrgLogin'

class NewOrganizations extends React.Component {

  render () {
    return (
        <div className="modal-dialog modal-sm" style={{height:100}}>

            <Modal.Dialog className="modal-backdrop">
              <Modal.Header style={{color: "white"}}>
                <div className="row text-center">
                  <img width={100} height={100} src={logo} className="rounded mx-auto d-block" alt=""/>
                  <Modal.Title>Signin As An Organization</Modal.Title>
                </div>
              </Modal.Header>

              <Modal.Body>
                <OrgLogin/>
              </Modal.Body>
            </Modal.Dialog>
          </div>
    )
  }
}

export { NewOrganizations }
