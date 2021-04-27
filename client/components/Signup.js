import React from 'react';
import { connect } from 'react-redux';
import { authenticateSignup } from '../store';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@material-ui/core';

/** Reformatted with Formik: */
const SignUpForm = ({ values, errors, touched, handleChange, isSubmitting }) => (
  <div>
    <Form style={{ margin: '6px' }} name={values.displayName}>
      <div>
        <label>Email: </label>
        <Field
          as={TextField}
          style={{ height: '25px' }}
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <div style={{ color: 'red' }}>{touched.email && errors.email && <p>{errors.email}</p>}</div>
      </div>
      <p />
      <div>
        <label>Password: </label>
        <Field
          as={TextField}
          style={{ height: '25px' }}
          name="password"
          placeholder="password"
          onChange={handleChange}
          type="password"
        />
        <div style={{ color: 'red' }}>
          {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
      </div>
      <p />
      <div>
        <label>Full Name: </label>
        <Field
          as={TextField}
          style={{ height: '25px' }}
          name="fullName"
          placeholder="full name"
          onChange={handleChange}
        />
        <div style={{ color: 'red' }}>
          {touched.fullName && errors.fullName && <p>{errors.fullName}</p>}
        </div>
      </div>
      <p />
      <div>
        <Button type="submit" disabled={isSubmitting}>
          Sign Up
        </Button>
      </div>
      {errors && errors.response && <div> {errors.response.data} </div>}
    </Form>
  </div>
);

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
