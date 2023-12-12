import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from '../store';
import { useDarkMode } from './DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const CustomNavbar = ({ handleClick, isLoggedIn }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="md" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className={isLoggedIn ? 'd-none' : ''}>Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/images">Images</Nav.Link>
                <Nav.Link as={NavLink} to="/generate-image">Create</Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ml-auto">
            {!isLoggedIn && (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
              </>
            )}
            <Nav.Link onClick={toggleDarkMode}>
              {darkMode ? '🌒' : '🌖'}
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link onClick={handleClick}>
                <FontAwesomeIcon icon={faRightFromBracket} /> 
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
});

const mapDispatch = (dispatch) => ({
  handleClick() {
    dispatch(logout());
  },
});

export default connect(mapState, mapDispatch)(CustomNavbar);
