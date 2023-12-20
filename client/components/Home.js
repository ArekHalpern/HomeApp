import React from 'react';
import { connect } from 'react-redux';


export const Home = props => {
  const { username } = props;

  return (
    <div className="container home-container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h3>Welcome, {username}</h3>
          <div className="input-group mt-4">
            <input type="text" className="form-control" placeholder="Start typing..." />
            <span className="input-group-text blinking-icon">&#x25C9;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
