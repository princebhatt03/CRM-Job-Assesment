import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MessageHistory } from "../../components/message-history/MessageHistory.comp";
import tickets from "../../assets/data/dummy-tickets.json";
import { UpdateTicket } from "../../components/update-ticket/UpdateTicket.comp";

// const ticket = tickets[0];
export const Ticket = () => {
  const { tId } = useParams();
  const [reply, setReply] = useState("");
  const [ticket, setTicket] = useState({});
  useEffect(() => {
    const foundticket = tickets.find((t) => t.id === parseInt(tId));
    setTicket(foundticket);
  }, [tId]);

  const handleOnChange = (e) => setReply(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col className="fw-bolder text-secondary">
          <div className="subject">Subject : {ticket.subject}</div>
          <div className="date">Date : {ticket.addedAt}</div>
          <div className="status">Status : {ticket.status}</div>
        </Col>
        <Col className="text-end">
          <Button variant="outline-info">Close Ticket</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>{ticket.history && <MessageHistory msg={ticket.history} />}</Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <UpdateTicket
            reply={reply}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};
