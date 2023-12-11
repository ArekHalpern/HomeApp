import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { useDarkMode } from './DarkModeContext';

const Navbar = ({ handleClick, isLoggedIn }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className={`navbar navbar-expand-md ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto d-flex flex-row">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/images">Images</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/generate-image">Create</Link>
            </li>
          </ul>
          <ul className="navbar-nav d-flex flex-row">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button onClick={handleClick} className="btn btn-outline-secondary me-2">Logout</button>
              </li>
            )}
            <li className="nav-item">
              <button onClick={toggleDarkMode} className="btn-toggle-dark-mode">
                {darkMode ? '🌜' : '🌞'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

/**
 * CONTAINER
 */
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

export default connect(mapState, mapDispatch)(Navbar);
