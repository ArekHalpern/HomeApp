import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import imagesReducer from './images'; // Assuming this is your images reducer
import generatedImage from './generateImage';

const reducer = combineReducers({ auth, images: imagesReducer, generatedImage }); // Corrected reducer combination
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './images';
export * from './generateImage';


