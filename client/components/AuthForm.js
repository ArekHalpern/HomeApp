import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthForm = (props) => {
  const { displayName, error } = props;

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    try {
      if (displayName === 'Sign Up') {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } else {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      }
      // You can handle post-authentication logic here
    } catch (error) {
      // Handle authentication errors
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="video-section">
        <video autoPlay loop muted className="background-video">
          <source src="/Assets/Videos/galaxyzoom2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="p-3 border rounded">
              <div className="mb-3">
                <input className="form-control" name="email" type="email" placeholder="Email" />
              </div>
              <div className="mb-3">
                <input className="form-control" name="password" type="password" placeholder="Password" />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  {displayName}
                </button>
              </div>
              {error && (
                <div className="alert alert-danger mt-2">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, formName) {
      evt.preventDefault();
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

