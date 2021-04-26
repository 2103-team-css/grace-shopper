import React from "react";
import { connect } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../store/user";

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const { users } = this.props;
    return (
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <div>
              <h3>Name: {user.fullName}</h3>
              <h4>Email: {user.email}</h4>
              <h4>Admin Status: {user.isAdmin.toString()}</h4>
            </div>
            <div>
              <button
                className="remove"
                onClick={() => this.props.deleteUser(user)}
              >
                Delete User
              </button>
              <button
                onClick={() => {
                  user.isAdmin = !user.isAdmin;
                  this.props.updateUser(user);
                }}
              >
                {" "}
                Toggle Admin
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  users: state.users.all,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  deleteUser: (user) => dispatch(deleteUser(user, history)),
  updateUser: (user) => dispatch(updateUser(user, history)),
});

export default connect(mapState, mapDispatch)(AllUsers);
