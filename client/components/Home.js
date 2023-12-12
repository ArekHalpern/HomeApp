import React from 'react';
import { connect } from 'react-redux';

export const Home = props => {
  const { username } = props;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3 className="text-center">Welcome, {username}</h3>
          {/* Add more content here as needed */}
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

