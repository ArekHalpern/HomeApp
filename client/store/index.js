import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'
import images from './images'
import generatedImage from './generateImage'
import generateRealisticImage from './realisticImage'

const reducer = combineReducers({ auth, images, generatedImage, generateRealisticImage })
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './images'
export * from './generateImage'
export * from './realisticImage'
