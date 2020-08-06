import React from 'react'
import { Form, Field } from 'formik';
import { withFormik } from 'formik';
import {
    Button,
    Divider,
    Box,
    Link
} from '@material-ui/core';
import {
    TextField,
} from 'formik-material-ui';
import { EmailField, PasswordField } from "./SharedTextFields"

export const SignupForm = props => {
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
            data-testid="name-field"
                fullWidth={true}
                className="row text-field"
                component={TextField}
                name="name"
                type="text"
                margin="normal"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.name}
                placeholder="Enter full name"
            />
            <PasswordField 
            placeholder="Create password" handleChange={handleChange}
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
                <Link className="link" href="/login"><p className="link">Already have an account? Log in</p></Link>
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