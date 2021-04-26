import React from "react";
import { connect } from "react-redux";
import { authenticateLogin } from "../store";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@material-ui/core";

/** Reformatted with Formik: */
const LoginForm = ({ values, errors, touched, handleChange, isSubmitting }) => (
  <div>
    <Form style={{ margin: "6px" }} name={values.displayName}>
      <div>
        <label>Email: </label>
        <Field
          as={TextField}
          style={{ height: "25px" }}
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <div style={{ color: "red" }}>
          {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
      </div>
      <p />
      <div>
        <label>Password: </label>
        <Field
          as={TextField}
          style={{ height: "25px" }}
          name="password"
          placeholder="password"
          onChange={handleChange}
          type="password"
        />
        <div style={{ color: "red" }}>
          {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
      </div>
      <p />
      <div>
        <Button type="submit" disabled={isSubmitting}>
          Login
        </Button>
      </div>
    </Form>
  </div>
);

const LoginFormApp = withFormik({
  mapPropsToValues() {
    return {
      email: "",
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid.")
      .required("Email is required."),
    password: Yup.string()
      .min(7, "Password minimum is 7 characters in length.")
      .required("Password is required."),
  }),
  handleSubmit(values, { props, setSubmitting }) {
    console.log("handle submit hit!");
    setSubmitting(true);
    props.dispatch(
      authenticateLogin(values.email, values.password)
    );
  },
})(LoginForm);

const mapSignup = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

export default connect(mapSignup)(LoginFormApp);
