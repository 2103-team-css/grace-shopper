import axios from "axios";

export const UPDATE_USER = "UPDATE_USER";
export const SET_USER = "SET_USER";
export const DELETE_USER = "DELETE_USER";

export const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};
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

export const fetchUsers = () => {
  return async (dispatch) => {
    const { data: users } = await axios.get("/api/admin/users", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    dispatch(setUsers(users));
  };
};

export const updateUser = (user, history) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/admin/users/${user.id}`,
      user,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    dispatch(_updateUser(updated));
    history.push("/");
  };
};

export const deleteUser = (user, { history }) => {
  return async (dispatch) => {
    await axios.delete(`/api/admin/users/${user.id}`);
    dispatch(_deleteUser(user));
    history.push("/");
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
      return state.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
}
