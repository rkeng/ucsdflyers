import React from 'react'
import { Col } from 'react-bootstrap'

export function ColCenter(props){
    return(
        <Col sm={12} mdOffset={2} md={8}>
            {props.children}
        </Col>
    )
}