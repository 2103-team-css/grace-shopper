import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    try {
      const res = await axios.get('/auth/me', {
        headers: {
          authorization: token,
        },
      });
      return dispatch(setAuth(res.data));
    } catch (err) {
      console.error(err);
    }
  }
};

export const authenticateLogin = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/login`, { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const authenticateSignup = (email, password, fullName) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/signup`, { email, password, fullName });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
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
}
