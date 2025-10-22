import React from 'react'
import { Form, Button } from 'react-bootstrap'

export const UpdateTicket = ({reply, handleOnChange, handleOnSubmit}) => {
  return (
    <Form onSubmit={handleOnSubmit}>
        <Form.Label className='fw-bolder'>Reply</Form.Label>
        <Form.Text className='text-muted d-block'>Please reply your message or update the ticket</Form.Text>
        <Form.Control value={reply} onChange={handleOnChange} as="textarea" rows={5} name="detail"/>
        <div className="text-end mt-3 mb-3">
        <Button variant="info" type="submit">Reply</Button>
        </div>
    </Form>
  )
}
