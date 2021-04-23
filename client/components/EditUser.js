import React, { Component } from "react";
import { updateUser } from "../store/user";
import { connect } from "react-redux";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email || "",
      password: props.user.password || "",
      isAdmin: props.user.isAdmin,
      fullName: props.user.fullName || "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.updateUser(this.props.match.id);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.id) {
      this.setState({
        email: props.user.email,
        password: props.user.password,
        isAdmin: props.user.isAdmin,
        fullName: props.user.fullName,
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateUser({ ...this.props.user, ...this.state });
  }

  render() {
    const { email, password, isAdmin, fullName } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form id="updateUser-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input name="email" onChange={handleChange} value={email} />
          <label htmlFor="password">Password: </label>
          <input name="password" onChange={handleChange} value={password} />
          <label htmlFor="isAdmin">Admin Setting: </label>
          <input name="isAdmin" onChange={handleChange} value={isAdmin} />
          <label htmlFor="fullName">Full Name: </label>
          <input name="fullName" onChange={handleChange} value={fullName} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateUser: (user) => dispatch(updateUser(user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
