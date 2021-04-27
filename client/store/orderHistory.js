import axios from 'axios';

//action types
export const SET_HISTORY = 'SET_HISTORY';

//action creator
const setHistory = (history) => {
  return {
    type: SET_HISTORY,
    history,
  };
};

//thunk
export const fetchHistory = (userId) => {
  return async (dispatch) => {
    const { data: history } = await axios.get(`/api/orders/${userId}`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
    dispatch(setHistory(history));
  };
};

// reducer
export default function historyReducer(state = [], action) {
  switch (action.type) {
    case SET_HISTORY:
      return action.history;
    default:
      return state;
  }
}
