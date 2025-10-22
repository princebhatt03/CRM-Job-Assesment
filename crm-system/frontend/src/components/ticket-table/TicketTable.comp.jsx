import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
export const TicketTable = ({ tickets }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr key="header">
          <th>#</th>
          <th>Subjects</th>
          <th>Status</th>
          <th>Opened Dates</th>
        </tr>
      </thead>
      <tbody>
        {tickets.length ? (
          tickets.map((row) => (
            <tr key={row._id}>
              <td>{row._id}</td>
              <td>
                <Link to={`/ticket/${row.id}`}>{row.subject}</Link>
              </td>
              <td>{row.status}</td>
              <td>{row.addedAt}</td>
            </tr>
          ))
        ) : (
          <tr key={"empty"}>
            <td colSpan={4} className="text-center">
              No Tickets To Show
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
