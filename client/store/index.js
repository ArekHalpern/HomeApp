import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import imagesReducer from './images'; 
import generateImageFooocusReducer from './generateImage'; 
import generateImageSdxlReducer from './sdxlRedux';
import generateImageRembgReducer from './rembgRedux';
import generateImagePhotomakerReducer from './pmRedux';
// import generateImageLcmReducer from './generateImageLCM';

const reducer = combineReducers({
  auth,
  images: imagesReducer,
  fooocusImage: generateImageFooocusReducer,
  sdxlImage: generateImageSdxlReducer, 
  rembgImage: generateImageRembgReducer,
  photomakerImage: generateImagePhotomakerReducer,
//   lcmImage: generateImageLcmReducer,
});

const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './images';
export * from './generateImage';
export * from './sdxlRedux';
export * from './rembgRedux';
export * from './pmRedux';

