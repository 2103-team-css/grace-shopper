import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/user";

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
            <h3>Name: {user.fullName}</h3>
            <h4>Email: {user.email}</h4>
            <h4>Admin Status: {user.isAdmin.toString()}</h4>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  users: state.users.all,
});

const mapDispatch = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapState, mapDispatch)(AllUsers);
