import React from 'react';
import { connect } from 'react-redux';
import { authenticateLogin } from '../store';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, makeStyles, Grid, Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formContainer: {
    margin: '1rem auto',
  },
  form: {
    width: '100%',
  },
}));

/** Reformatted with Formik: */
const LoginForm = ({ values, errors, touched, handleChange, isSubmitting }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.formContainer}>
      <Box mt={3}>
        <Form name={values.displayName} className={classes.form}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                error={touched.email && !!errors.email}
                helperText={errors.email}
                name="email"
                placeholder="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={touched.password && !!errors.password}
                helperText={errors.password}
                name="password"
                placeholder="password"
                type="password"
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Container>
  );
};

const LoginFormApp = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid.').required('Email is required.'),
    password: Yup.string()
      .min(7, 'Password minimum is 7 characters in length.')
      .required('Password is required.'),
  }),
  handleSubmit(values, { props, setSubmitting }) {
    console.log('handle submit hit!');
    setSubmitting(true);
    props.dispatch(authenticateLogin(values.email, values.password));
    setSubmitting(false);
  },
})(LoginForm);

const mapSignup = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

export default connect(mapSignup)(LoginFormApp);
