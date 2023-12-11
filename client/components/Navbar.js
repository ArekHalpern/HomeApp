import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from '../store';
import { useDarkMode } from './DarkModeContext';

const CustomNavbar = ({ handleClick, isLoggedIn }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="md">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/images">
              <Nav.Link>Images</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/generate-image">
              <Nav.Link>Create</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <Nav.Link onClick={handleClick}>Logout</Nav.Link>
            )}
            <Nav.Link onClick={toggleDarkMode}>
              {darkMode ? '🌒' : '🌖'}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(CustomNavbar);
