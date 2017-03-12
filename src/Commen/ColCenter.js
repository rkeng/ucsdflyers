import React from 'react'
import { Col } from 'react-bootstrap'

export function ColCenter(props){
    return(
        <Col xs={12} sm={12} mdOffset={2} md={8}>
            {props.children}
        </Col>
    )
}