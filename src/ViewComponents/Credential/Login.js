import React, { useState, Fragment } from 'react'
import { Form, Field } from 'formik';
import { withFormik } from 'formik';
import {
    Button,
    InputLabel,
    Divider,
    Box, Link, IconButton, InputAdornment
} from '@material-ui/core';
import {
    TextField,
} from 'formik-material-ui';
import VisibilityIcon from '@material-ui/icons/Visibility';  // Filled password icon - viewable
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'; //default password icon
import { EmailField, PasswordField } from "./SharedTextFields"


const LoginForm = props => {
    const [value, setValue] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShow] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false)

    const {
        values,
        handleChange,
        handleSubmit,
    } = props

    return <div className="form">
        <Form onSubmit={handleSubmit}>
        <EmailField handleChange={handleChange} value={values.email} />
            {showPassword &&
                <PasswordField placeholder="Enter Password" 
                    handleChange={handleChange} value={values.password}
                />
            }
            <Box margin={1}>
                <Button
                    className="row main-submit-btn"
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
            <Divider />
            <Box margin={1}>
                <Link href="/signup" className="link"><p>Sign up for an account</p></Link>
            </Box>
        </Form>
    </div>
}

const LoginView = withFormik({
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

export default LoginView