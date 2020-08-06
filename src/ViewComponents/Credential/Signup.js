import React, { useState, Fragment } from 'react'
import { Form, Field } from 'formik';
import { withFormik } from 'formik';
import {
    Button,
    InputLabel,
    Divider,
    Box,
    Link
} from '@material-ui/core';
import {
    TextField,
} from 'formik-material-ui';
import { EmailField, PasswordField } from "./SharedTextFields"

const SignupForm = props => {
    const [value, setValue] = useState({
        email: "",
        password: ""
    })

    const [passwordVisible, setPasswordVisible] = useState(false)


    const {
        values,
        handleChange,
        handleSubmit,
    } = props

    return <div className="form">
        <Form onSubmit={handleSubmit}>
            <p className="title">Sign up for your account</p>
            <EmailField handleChange={handleChange} value={values.email} />
            <Field
                fullWidth={true}
                className="row text-field"
                component={TextField}
                name="text"
                type="name"
                margin="normal"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.name}
                placeholder="Enter full name"
            />
            <PasswordField placeholder="Create password" handleChange={handleChange}
                value={values.password} />

            <Button
                className="row main-submit-btn"
                onClick={handleSubmit}
            >Sign up</Button>

            <p className="or-label">OR</p>

            <Button
                className="row submit-btn"
                onClick={handleSubmit}
            >Continue with Google</Button>
            <Button
                className="row submit-btn"
                onClick={handleSubmit}
            >Continue with Git hub</Button>
            <Box margin={1}>
            <Divider className="blank-divider"/>
                <Link className="link" href="/login"><p>Already have an account? Log in</p></Link>
            </Box>
        </Form>
    </div>
}

const SignupView = withFormik({
    mapPropsToValues: () => ({
        email: "",
        name: "",
        password: ""
    }),

    // Custom sync validation
    validate: values => {
        const errors = {}
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Please enter a valid email address';
        }
        if (!values.name) {
            errors.name = 'Required';
        }
        //TODO: name must be alphabets
        if (!values.password) {
            errors.password = 'Required';
        }
        //TODO
        //Password regex
        return errors;
    },
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values);
    },

    displayName: 'BasicForm',
})(SignupForm);


//TODO
// onContinue needs to use the server to validate if the email already exists

export default SignupView