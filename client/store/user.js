import axios from "axios";
export const UPDATE_USER = "UPDATE_USER";
export const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
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
    dispatch(_updateProduct(updated));
    history.push("/");
  };
};

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_USER:
      return state.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    default:
      return state;
  }
}
