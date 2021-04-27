import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../store/user';

import {
  Button,
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const { users } = this.props;
    return (
      <Container>
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Admin Status</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <IconButton
                        style={{ color: 'red' }}
                        onClick={() => this.props.deleteUser(user)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.fullName}
                    </TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.isAdmin.toString()}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          user.isAdmin = !user.isAdmin;
                          this.props.updateUser(user);
                        }}
                      >
                        Toggle Admin
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
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
