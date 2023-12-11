import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, Navigate, } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import ImagesGrid from './components/getImages';
import getSingleImage from './components/getSingleImage';
import ImageGenerator from './components/ImageGen';
import { me } from './store';

class AppRoutes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Routes>
          {isLoggedIn ? (
            <Fragment>
              <Route path="/home" element={<Home />} />
              <Route path="/images" element={<ImagesGrid />} />
              <Route path="/generate-image" element={<ImageGenerator />} />
              <Route path="/image/:id" element={<getSingleImage />} />
            </Fragment>
          ) : (
            <Fragment>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Fragment>
          )}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </div>
    );
  }
}

const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
});

const mapDispatch = (dispatch) => ({
  loadInitialData() {
    dispatch(me());
  },
});

export default connect(mapState, mapDispatch)(AppRoutes);
