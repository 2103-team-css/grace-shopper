import React from 'react';
import { connect } from 'react-redux';
import { authenticateSignup } from '../store';
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
const SignUpForm = ({ values, errors, touched, handleChange, isSubmitting }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.formContainer}>
      <Box mt={3}>
        <Form name={values.displayName}>
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
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                id="fullName"
                label="Full Name"
                variant="outlined"
                fullWidth
                error={touched.fullName && !!errors.fullName}
                helperText={errors.fullName}
                name="fullName"
                placeholder="full name"
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
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Container>
  );
};

const SignUpFormApp = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
      fullName: '',
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid.').required('Email is required.'),
    password: Yup.string()
      .min(7, 'Password minimum is 7 characters in length.')
      .required('Password is required.'),
    fullName: Yup.string().required('Full name is required for sign-up.'),
  }),
  handleSubmit(values, { props, setSubmitting }) {
    console.log('handle submit hit!');
    setSubmitting(true);
    props.dispatch(authenticateSignup(values.email, values.password, values.fullName));
    setSubmitting(false);
  },
})(SignUpForm);

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

export default connect(mapSignup)(SignUpFormApp);
