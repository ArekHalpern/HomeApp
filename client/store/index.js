import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'
import { fetchImages, fetchSingleImage} from './images'
import generatedImage from './generateImage'


const reducer = combineReducers({ auth, generatedImage, fetchImages, fetchSingleImage  })
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './images'
export * from './generateImage'

