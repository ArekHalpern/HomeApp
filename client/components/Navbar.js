import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
// import { connect } from 'react-redux'; // Commented out for now
// import { logout } from '../store'; // Commented out for now
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const CustomNavbar = () => {
  return (
    <Navbar expand="md" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/generate-image"><FontAwesomeIcon icon={faStar} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* All users can see these links */}
            {/* <Nav.Link as={NavLink} to="/home">Home</Nav.Link> */}
            <Nav.Link as={NavLink} to="/generate-image">Generate</Nav.Link>
            <Nav.Link as={NavLink} to="/remove-background">Remove Background</Nav.Link>
            {/* <Nav.Link as={NavLink} to="/photo-maker">PhotoMaker</Nav.Link> */}
            {/* <Nav.Link as={NavLink} to="/edit">Edit Image</Nav.Link> */}
            {/* <Nav.Link as={NavLink} to="/lcm">LCM</Nav.Link> */}
            {/* <Nav.Link as={NavLink} to="/images">Saved</Nav.Link> */}
          </Nav>
          {/* Authentication related links are commented out for future use */}
          {/* <Nav className="ml-auto">
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
              <Nav.Link onClick={handleClick}>
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Commenting out Redux connection for now
// const mapState = (state) => ({
//   isLoggedIn: !!state.auth.id,
// });

// const mapDispatch = (dispatch) => ({
//   handleClick() {
//     dispatch(logout());
//   },
// });

// export default connect(mapState, mapDispatch)(CustomNavbar);
export default CustomNavbar;
