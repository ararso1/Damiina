import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container className='mynav'>
        <Navbar.Brand href="/" className="fw-bold">Julie Arnaud</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className='nav-link' href="/">Home</Nav.Link>
            <Nav.Link className='nav-link' href="/about">About</Nav.Link>
            <Nav.Link className='nav-link' href="/online-sessions">Live Online Sessions</Nav.Link>
            <Nav.Link className='nav-link' href="/books">Books</Nav.Link>
            <Nav.Link className='nav-link' href="/blogs">Blogs</Nav.Link>
            <Nav.Link className='nav-link' href="/contact">Contact</Nav.Link>
            <button className="button-28 ms-3" role="button">Schedule a Call</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
