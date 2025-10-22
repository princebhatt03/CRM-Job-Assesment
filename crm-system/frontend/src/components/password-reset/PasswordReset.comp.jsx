import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const PasswordReset = ({ handleOnChange, email, handleOnResetSubmit, formSwitcher }) => {
  return (
    <Container className="text-start">
      <Row>
        <Col>
          <h1 className="text-info text-center">Password Reset</h1>
          <hr />
          <Form className="fs-4" autoComplete="off" onSubmit={handleOnResetSubmit}>
            <Form.Group className="mb-2" controlId="formPasswordResetEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleOnChange}
                value={email}
                placeholder="Enter email"
                required
              />
              <Form.Text className="text-muted fs-6">
                <p>We'll share the link to change password on your email</p>
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <a href="#!" onClick={() => formSwitcher("login")} className="fs-6">
            Login Now?
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordReset;