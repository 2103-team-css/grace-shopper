import React, { useState } from 'react';
import {connect} from 'react-redux'
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { clearCart, submitCheckout } from '../store'

// use a hook to get state??

// needed props can be passed to the component in it's parent component??

// is handed the 'formik bag' by being connected below
const CheckoutForm = ( { values, cart, errors, touched, handleChange, isSubmitting } ) => (
    // email should be read only in form
        <div>
            <Form style={{ margin: "6px" }}  >
                <div>
                <label>Full Name: </label> 
                <Field
                style={{ height: "25px" }}
                name={values.fullName}
                placeholder="full name"
                onChange={handleChange}
            />
            { touched.fullName && errors.fullName && <p>{errors.fullName}</p> }
            </div>
            < p/>
            <div>
                <label>email: </label>
                <span style={ {margin: '4px' } } >{values.email}</span>
            </div>
            < p/>
            <div>
                <label>Street: </label>
                <Field
                style={ { height: "25px", margin: "4px" } }
                name="street"
                onChange={handleChange}
                />
                { touched.street && errors.street && <p>{errors.street}</p> }
            </div>
            <div>
                <label>City: </label>
                <Field
                style={ { height: "25px", margin: "4px" } }
                name="city"
                onChange={handleChange}
                />
                { touched.city && errors.city && <p>{errors.city}</p> }
            </div>
            <div>
                <label>State: </label>
                <Field
                style={ { height: "25px", margin: "4px" } }
                name="state"
                onChange={handleChange}
                />
                { touched.state && errors.state && <p>{errors.state}</p> }
            </div>
            <div>
                <label>Zip: </label>
                <Field
                style={ { height: "25px", margin: "4px" } }
                name="zip"
                onChange={handleChange}
                />
                { touched.zip && errors.zip && <p>{errors.zip}</p> }
            </div>
            < p/>
            <div>
                <label>Payment Method: </label>
                <Field as="select" name="paymentMethod">
                    <option value="card">Card</option>
                    <option value="paypal">Paypal</option>
                    <option value="venmo">Venmo</option>
                </Field>
                { touched.paymentMethod && errors.paymentMethod && <p>{errors.paymentMethod}</p> }
            </div>
            <div>
            <button type="submit" disabled={isSubmitting} >Place Order</button>
            </div>
            </Form>
        </div>
        );

const CheckoutApp = withFormik({
    mapPropsToValues( { fullName, email } ) {
        return {
            fullName,
            email,
            street: '',
            city: '',
            state: '',
            zip: '',
            paymentMethod: '',
        }
    },
    validationSchema: Yup.object().shape( {
        fullName: Yup.string()
        .required('Full name is mandatory for submission.'),
        email: Yup.email('Email not valid.'),
        street: Yup.string()
        .required('Must enter a billing address.'),
        city: Yup.string()
        .required('Must enter a billing address.'),
        state: Yup.string()
        .required('Must enter a billing address.'),
        zip: Yup.string()
        .required('Must enter a billing address.'),
        paymentMethod: Yup.string()
        .required('Must select a payment method.'),
    } ),
    handleSubmit(values, { props, resetForm, setSubmitting } )  {
        console.log("Submit hit!")
        setSubmitting(true);
        // use props.dispatch to call thunk for post route './api/checkout
        props.dispatch(submitCheckout(values));
        //
        resetForm();
    },
})(CheckoutForm)

export default connect()(CheckoutApp);

