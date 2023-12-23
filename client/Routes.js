import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, Navigate, } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import ImagesGrid from './components/ImagesGrid';
import SingleImageModal from './components/SingleImageModal';
import ImageGenerator from './components/ImageGen';
import GuestHome from './components/GuestHome';
import ImageEditor from './components/CustomizeImage/ImageEditor';
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
              <Route path="/image/:id" element={<SingleImageModal />} />
              <Route path="/edit" element={<ImageEditor />} />
            </Fragment>
          ) : (
            <Fragment>
              <Route path="/" element={<GuestHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Fragment>
          )}
          {/* <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} />} /> */}
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
