import React from 'react';
import { connect } from 'react-redux';
import { signUp, logIn } from '../store';

const AuthForm = ({ displayName, error, signUp, logIn }) => {

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;

    try {
      if (displayName === 'Sign Up') {
        await signUp(email, password);
      } else {
        await logIn(email, password);
      }
    } catch (authError) {
      console.error('Authentication error:', authError);
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

const mapLogin = (state) => ({
  displayName: 'Login',
  error: state.auth.error,
});

const mapSignup = (state) => ({
  displayName: 'Sign Up',
  error: state.auth.error,
});

const mapDispatch = (dispatch) => ({
  signUp: (email, password) => dispatch(signUp(email, password)),
  logIn: (email, password) => dispatch(logIn(email, password)),
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);