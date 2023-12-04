import React from 'react';
import { connect } from 'react-redux';

export const Home = props => {
  const { username } = props;

  return (
    <div className="container mt-5">
      <h3 className="text-center">Welcome, {username}</h3>
    </div>
  );
};

const mapState = state => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);

