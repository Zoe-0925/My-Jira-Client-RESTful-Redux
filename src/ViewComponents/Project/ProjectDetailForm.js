import React, { useState, Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Form, Field } from 'formik';
import { withFormik } from 'formik';
import { DotIconMenu } from "../Shared/Tabs"
import {
    Button,
    InputLabel,
    Divider,
    MenuItem,
} from '@material-ui/core';
import {
    TextField,
    Select,
} from 'formik-material-ui';

const projectName = "test project Name"
const projectId = "test id"


const ProjectDetailForm = props => {
    const category = []
    const categoryItems = category.map(each => <MenuItem value={each}>{each}</MenuItem>)

    function removeProject() {

    }

    function handleClick(destination) {

    }
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

    return <div className="project-detail-form">
        <div className="row">
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/projects">
                    Projects</Link>
                <Link color="inherit" href={"/project/" + projectId}>
                    <Typography color="textPrimary">{projectName}</Typography>
                </Link>
            </Breadcrumbs>
        </div>
        <div className="row">
            <Typography variant="h5">Details</Typography>
            <DotIconMenu className="delete-project-icon" click={removeProject} >
                <MenuItem>Move to Trash</MenuItem>
            </DotIconMenu>
        </div>
        <img className="project-icon" src="https://www.lovethispic.com/uploaded_images/218149-Hot-Guy-To-Wake-Up-To.jpg" alt="project icon" />
        <input className="row Tab button" accept="image/*" id="button-file" type="file" />
        <div className="form">
            <Form onSubmit={handleSubmit}>
                <InputLabel className="row" id="state">Name</InputLabel>
                <Field
                    className="row full"
                    component={TextField}
                    name="name"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    value={values.name}
                />
                <InputLabel className="row" id="state">Key</InputLabel>
                <Field
                    className="row full"
                    component={TextField}
                    name="key"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    value={values.key}
                />
                <InputLabel className="row" id="category">Category</InputLabel>
                <Field
                    className="select full"
                    component={Select}
                    labelId="state" id="select" name="state"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.state}
                    placeholder="Choose a category"
                >
                    {categoryItems}
                </Field>
                <InputLabel className="row" id="state">Default Assignee</InputLabel>
                <Field
                    className="select full"
                    component={Select}
                    labelId="state" id="select" name="state"
                    variant="outlined"
                    onChange={handleChange}
                    value="Project Lead"
                    placeholder="Choose a category"
                >
                    {categoryItems}
                </Field>
                <Divider />
                <Button
                    className="row navbar-create-btn"
                    onClick={handleSubmit}
                >Save</Button>
            </Form>
        </div>
    </div>
}

const ProjectDetail = withFormik({
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
})(ProjectDetailForm);


//TODO
// onContinue needs to use the server to validate if the email already exists

export default ProjectDetail