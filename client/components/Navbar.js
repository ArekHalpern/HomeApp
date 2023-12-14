import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faStar } from '@fortawesome/free-solid-svg-icons';
import { logOut } from '../store/auth'; 


const CustomNavbar = ({ handleClick, isLoggedIn }) => {
  return (
    <Navbar expand="md" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className={isLoggedIn ? 'd-none' : ''}><FontAwesomeIcon icon={faStar} /></Navbar.Brand>
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
  isLoggedIn: !!state.auth.user, 
});

const mapDispatch = (dispatch) => ({
  handleLogout() {
    dispatch(logOut());  
  },
});

export default connect(mapState, mapDispatch)(CustomNavbar);