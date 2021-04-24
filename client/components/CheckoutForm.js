import React from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux'
import { withFormik, Form, Field, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { submitCheckout } from '../store/orderHistory';
import auth from '../store/auth';
import { TextField, Button, Select } from "@material-ui/core";

// OR CAN I GET THEM ALL FROM STATE AND MAP THEM TO MY PROPS??
// { values, errors, touched, isSubmitting }
// is handed the 'formik bag' by being connected below
const CheckoutForm = ( { values, errors, touched, isSubmitting } ) => {
    return (
        <div>
            <Form style={{ margin: "6px" }}  >
                <div>
                <label>Full Name: </label> 
                <Field
                as={TextField}
                style={{ height: "25px" }}
                name="fullName"
                placeholder="full name"
            />
            { touched.fullName && errors.fullName && <p>{errors.fullName}</p> }
            </div>
            < p/>
            <div>
                <label>Email: </label>
                <Field
                as={TextField}
                style={ { height: "25px", margin: "4px" } }
                name="email"
                // readonly
                />
                { touched.street && errors.street && <p>{errors.street}</p> }
            </div>
            < p/>
            <div>
                <label>Street: </label>
                <Field
                as={TextField}
                style={ { height: "25px", margin: "4px" } }
                name="street"
                />
                { touched.street && errors.street && <p>{errors.street}</p> }
            </div>
            <div>
                <label>City: </label>
                <Field
                as={TextField}
                style={ { height: "25px", margin: "4px" } }
                name="city"
                />
                { touched.city && errors.city && <p>{errors.city}</p> }
            </div>
            <div>
                <label>State: </label>
                <Field
                as={TextField}
                style={ { height: "25px", margin: "4px" } }
                name="state"
                />
                { touched.state && errors.state && <p>{errors.state}</p> }
            </div>
            <div>
                <label>Zip: </label>
                <Field
                as={TextField}
                style={ { height: "25px", margin: "4px" } }
                name="zip"
                />
                { touched.zip && errors.zip && <p>{errors.zip}</p> }
            </div>
            < p/>
            <div>
                <label>Payment Method: </label>
                <Field as={Select} name="paymentMethod">
                    <option value="card">Card</option>
                    <option value="paypal">Paypal</option>
                    <option value="venmo">Venmo</option>
                </Field>
                { touched.paymentMethod && errors.paymentMethod && <p>{errors.paymentMethod}</p> }
            </div>
            <p />
            <div>
            <Button type="submit" disabled={isSubmitting} >Place Order</Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
        </div>
        )
    };

const CheckoutApp = withFormik({
    mapPropsToValues( { id, fullName, email, cart } ) {
        console.log('fullName>>>', fullName);
        const fieldValues = {
            id,
            fullName: fullName || '',   //if they are not logged in, they won't have fullName??
            email: email || '',
            cart,
            paymentMethod: '',
                street: '',
                city: '',
                state: '',
                zip: '',
        }
        console.log('fieldValues>>>', fieldValues);
        return fieldValues;
    },
    validationSchema: Yup.object().shape( {
        fullName: Yup.string()
        .required('Full name is mandatory for submission.'),
        email: Yup.string().email('Email not valid.'),
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
        const shippingObj = {
            street: values.street,
            city: values.city,
            state: values.state,
            zip: values.zip
        };
        const paymentObj = {
            email: values.email,
            method: values.paymentMethod,
        };
        console.log("Submit hit!")
        setSubmitting(true);
        // use props.dispatch to call thunk for post route './api/checkout
        props.dispatch(submitCheckout(values.id, values.cart, paymentObj, shippingObj, props.history));
        // clear cart is done inside the above thunk, dispatched to cart reducer
        resetForm();
    },
    enableReinitialize: true,
})(CheckoutForm)


const mapState = state => {
    return {
        id: state.auth.id,
        fullName: state.auth.fullName,
        email: state.auth.email,
        cart: state.cart,
    }

}

export default connect(mapState)(CheckoutApp);

