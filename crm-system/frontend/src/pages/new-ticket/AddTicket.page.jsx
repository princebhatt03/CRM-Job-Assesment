import React, { useState } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import { AddTicketForm } from '../../components/add-ticket-form/AddTicketForm.comp'

export const AddTicket = () => {
  const initialFrmDt = {
    subject : "",
    issueDate: "",
    detail: "",
  };

  const [formData, setFormData] = useState(initialFrmDt)

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitting request received", formData);
  }

  const handleOnChange = e => {
    e.preventDefault;
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <Container>
        <Row>
            <Col>
                <AddTicketForm
                  handleOnChange={handleOnChange}
                  formData = {formData}
                  handleOnSubmit={handleOnSubmit} />
            </Col>
        </Row>
    </Container>
  )
}
