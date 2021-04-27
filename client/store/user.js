import axios from 'axios';

export const UPDATE_USER = 'UPDATE_USER';
export const SET_USER = 'SET_USER';
export const DELETE_USER = 'DELETE_USER';

const setUsers = (users) => {
  return {
    type: SET_USER,
    users,
  };
};
export const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get('/api/admin/users', {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });
      dispatch(setUsers(users));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateUser = (user, history) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/admin/users/${user.id}`, user, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });
      dispatch(_updateUser(updated));
      history.push('/admin/users');
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteUser = (user, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/admin/users/${user.id}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });
      dispatch(_deleteUser(user));
      history.push('/admin/users');
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {
  all: [],
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, all: action.users };
    case UPDATE_USER:
      return {
        ...state,
        all: state.all.map((user) => (user.id === action.user.id ? action.user : user)),
      };
    case DELETE_USER:
      return {
        ...state,
        all: state.all.filter((user) => user.id !== action.user.id),
      };
    default:
      return state;
  }
}
