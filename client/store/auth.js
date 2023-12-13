import firebase from 'firebase/app';
import 'firebase/auth';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    window.localStorage.setItem(TOKEN, token);
    const user = firebase.auth().currentUser;
    dispatch(setAuth({ user }));
  } catch (error) {
    console.error(error);
  }
};

export const authenticate = (email, password, method) => async dispatch => {
  try {
    const authMethod = method === 'login' ? 'signInWithEmailAndPassword' : 'createUserWithEmailAndPassword';
    await firebase.auth()[authMethod](email, password);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  return async dispatch => {
    await firebase.auth().signOut();
    window.localStorage.removeItem(TOKEN);
    dispatch(setAuth({}));
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
};

