import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets } from "../../features/ticket/ticketActions";
import { SearchForm } from "../../components/search-form/SearchForm.comp";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";

export const TicketLists = () => {
  const dispatch = useDispatch();
  const { tickets, isLoading, error } = useSelector((state) => state.tickets);
  const [str, setStr] = useState("");
  const [dispTickets, setDispTickets] = useState([]);

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  useEffect(() => {
    setDispTickets(tickets);
  }, [tickets]);

  const handleOnChange = (e) => setStr(e.target.value);

  const searchTicket = (str) => {
    const displayTickets = tickets.filter((row) =>
      row.subject.toLowerCase().includes(str.toLowerCase())
    );
    setDispTickets(displayTickets);
  };

  useEffect(() => {
    searchTicket(str);
  }, [str]);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Button as={Link} to="/add-ticket" variant="info">
            Add New Ticket
          </Button>
        </Col>
        <Col className="text-end">
          <SearchForm handleOnChange={handleOnChange} str={str} />
        </Col>
      </Row>
      <hr />
      <Row className="mt-4">
        <Col>
          {isLoading ? (
            <h3>Loading ...</h3>
          ) : error ? (
            <h3>Error occurred: {error}</h3>
          ) : (
            <TicketTable tickets={dispTickets} />
          )}
        </Col>
      </Row>
    </Container>
  );
};
