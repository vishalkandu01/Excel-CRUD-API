import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import PersonalInfoForm from './components/PersonalInfoForm';
import PersonalInfoList from './components/PersonalInfoList';
import PersonalInfoDelete from './components/PersonalInfoDelete';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/">Personal Info CRUD</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/add">Add Info</Nav.Link>
          <Nav.Link as={Link} to="/list">View Info</Nav.Link>
          <Nav.Link as={Link} to="/delete">Delete Info</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const App = () => {
  return (
    <Router>
      <NavBar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<h1>Welcome to Personal Info CRUD</h1>} />
          <Route path="/add" element={<PersonalInfoForm />} />
          <Route path="/list" element={<PersonalInfoList />} />
          <Route path="/delete" element={<PersonalInfoDelete />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;