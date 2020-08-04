import React, { useState, Fragment } from 'react'
import { Form, Field } from 'formik';
import { withFormik } from 'formik';
import {
    Button,
    InputLabel,
    Divider,
    Box
} from '@material-ui/core';
import {
    TextField,
} from 'formik-material-ui';

const LoginForm= props => {
    const [value, setValue] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShow] = useState(true)

    const validateEmail = () => {
        //if no error
        //value.email
        setShow(true)
        //else

    }

    const {
        values,
        handleChange,
        handleSubmit,
    } = props

    return <div className="form">
        <Form onSubmit={handleSubmit}>
            <InputLabel className="row" id="state">Email Address</InputLabel>
            <Field
                className="row"
                component={TextField}
                name="email"
                type="email"
                margin="normal"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.email}
            />
            {showPassword &&
                <Fragment>
                    <InputLabel className="row" id="state">Password</InputLabel>
                    <Field
                        className="row"
                        component={TextField}
                        name="password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        value={values.password}
                    />
                </Fragment>}
            <Box margin={1}>
                <Button
                    className="row submit-btn"
                    onClick={handleSubmit}
                >{showPassword ? "Log in" : "CONTINUE"}</Button>
            </Box>
            <Divider />
            <Box margin={1}>
                <Button
                    className="row submit-btn"
                    onClick={handleSubmit}
                >Log in with Google</Button>
                <Button
                    className="row submit-btn"
                    onClick={handleSubmit}
                >Log in with Git hub</Button>
            </Box>
        </Form>
    </div>
}

const Login = withFormik({
    mapPropsToValues: () => ({
        email: '',
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
})(LoginForm);


//TODO
// onContinue needs to use the server to validate if the email already exists

export default Login