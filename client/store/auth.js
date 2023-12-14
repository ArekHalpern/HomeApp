import { auth } from '../config/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Action Types
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

// Action Creators
const setUser = user => ({ type: SET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

// Thunk Creators
export const signUp = (email, password) => async dispatch => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(setUser(user));
  } catch (error) {
    console.error('Signup error:', error);
  }
};

export const logIn = (email, password) => async dispatch => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(user));
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const logOut = () => async dispatch => {
  try {
    await signOut(auth);
    dispatch(removeUser());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const checkAuthState = () => dispatch => {
  onAuthStateChanged(auth, user => {
    if (user) {
      dispatch(setUser(user));
    } else {
      console.log('User logged out or no user');
      dispatch(removeUser());
    }
  });
};

// Reducer
const initialState = {
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}
