import axios from 'axios';

const TOKEN = 'token';

// ACTION TYPES
const SET_AUTH = 'SET_AUTH';

// ACTION CREATORS
const setAuth = auth => ({ type: SET_AUTH, auth });

// THUNK CREATORS
export const me = () => async dispatch => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: user } = await axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(setAuth({ user }));
    }
  } catch (error) {
    console.error(error);
  }
};

export const authenticate = (email, password, method) => async dispatch => {
  try {
    const { data } = await axios.post(`/auth/${method}`, { email, password });
    window.localStorage.setItem(TOKEN, data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError.response.data }));
  }
};

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem(TOKEN);
    dispatch(setAuth({}));
  };
};

// REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
};
