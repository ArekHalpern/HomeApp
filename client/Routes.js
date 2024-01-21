import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'; // Make sure to import connect from react-redux
import Home from './components/Home';
import ImagesGrid from './components/ImagesGrid';
import SingleImageModal from './components/SingleImageModal';
import ModelSwitcher from './components/ModelSwitcher';
import GuestHome from './components/GuestHome';
import ImageEditor from './components/CustomizeImage/ImageEditor';
import ExcalidrawIframeComponent from './components/lcm/ExcalidrawComponent';
import RemoveBackgroundPage from './components/RemoveBackground';
import PhotomakerPage from './components/PhotoMaker';
// import { me } from './store'; // Commented out as it might not be needed

class AppRoutes extends Component {
  componentDidMount() {
    // this.props.loadInitialData(); // Commented out, adjust as needed
  }

  render() {
    const isLoggedIn = true; // Set to true to bypass authentication

    return (
      <div>
        <Routes>
          {/* Redirect the base URL to /home */}
          <Route path="/" element={<Navigate to="/generate-image" />} />
          <Route path="/remove-background" element={<RemoveBackgroundPage />} />
          <Route path="/photo-maker" element={<PhotomakerPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/images" element={<ImagesGrid />} />
          <Route path="/generate-image" element={<ModelSwitcher />} />
          <Route path="/image/:id" element={<SingleImageModal />} />
          <Route path="/edit" element={<ImageEditor />} />
          <Route path="/lcm" element={<ExcalidrawIframeComponent />} />

          {/* Additional routes can be added here if necessary */}

          {/* Redirect all unknown paths to /home */}
          <Route path="*" element={<Navigate to="/generate-image" />} />
        </Routes>
      </div>
    );
  }
}

// const mapState = (state) => ({
//   isLoggedIn: !!state.auth.id,
// });

const mapDispatch = (dispatch) => ({
  // loadInitialData() {
  //   dispatch(me());
  // },
});

export default connect(null, mapDispatch)(AppRoutes);
