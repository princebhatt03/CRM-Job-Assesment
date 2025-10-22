import React from 'react'
import {Form, Row, Col} from 'react-bootstrap'

export const SearchForm = ({handleOnChange, str}) => {
  return (
    <Form>
        <Form.Group as={Row} style={{'maxWidth': '350px'}}>
            <Form.Label column sm={4}>Search :</Form.Label>
            <Col sm={8}>
            <Form.Control
                type="text"
                name="searchstr"
                placeholder='Search Here'
                onChange={handleOnChange}
                value={str} /></Col>
        </Form.Group>
    </Form>
  )
}
