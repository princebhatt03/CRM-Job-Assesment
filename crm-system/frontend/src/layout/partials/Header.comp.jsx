import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutApi } from "../../api/userApi";
import { loginFailure } from "../../features/login/loginSlice";
import logo from "../../assets/img/logo.png";

export const Header = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const logMeOut = async () => {
    try {
      const res = await logoutApi();
      if (res) {
        dispatch(loginFailure("User Logged Out"));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavLinkClick = () => {
    setExpanded(false); // Collapse the navbar
  };

  return (
    <Navbar
      collapseOnSelect
      expanded={expanded}
      variant="dark"
      bg="info"
      expand="md"
      className="px-4"
    >
      <Navbar.Brand>
        <img src={logo} alt="logo" width="50px" />
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(expanded ? false : "expanded")} // Toggle the navbar
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto text-dark">
          <Nav.Link as={NavLink} to="/dashboard" onClick={handleNavLinkClick}>
            Dashboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/tickets" onClick={handleNavLinkClick}>
            Tickets
          </Nav.Link>
          <Nav.Link onClick={logMeOut}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
