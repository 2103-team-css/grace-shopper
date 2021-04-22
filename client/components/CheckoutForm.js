import React, { useState } from 'react';
import {connect} from 'react-redux'
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { clearCart } from '../store'

const useForm = (initValues) => {
    const [ fieldValues, setFieldValues ] = useState('');
}

const CheckoutForm = ( { values, cart, errors, touched, handleChange, isSubmitting } ) => (
        <div></div>
        )

const CheckoutApp = withFormik({
    mapPropsToValues( { fullName , email } ) {
        return {
            fullName,
            email,  // email should be read only in form
            billingAddress: {
                street: "",
                city: "",
                state: "",
                zip: ""
            },
            payment: {
                card: "",
                number: "",
                cvv: "",
            }
        }
    },
    validationSchema: Yup.object().shape( {

    } ),
    handleSubmit(values, { props, resetForm, setSubmitting } )  {
        console.log("Submit hit!");
        setSubmitting(true);
        // use props.dispatch to call thunk for post route './api/checkout
        resetForm();
    },
})(CheckoutForm)

export default connect()(CheckoutApp);
