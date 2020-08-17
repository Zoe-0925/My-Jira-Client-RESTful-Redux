import React from 'react'
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
import { useDispatch, useSelector } from "react-redux"
import { updateProject,deleteProject } from "../../Components/Project/Actions"
import {selectCurrentProject} from "../../Components/Selectors"

const ProjectDetailForm = props => {
    const category = []
    const categoryItems = category.map(each => <MenuItem value={each}>{each}</MenuItem>)

    const {
        values,
        handleChange,
        handleSubmit,
        project,
        removeProject
    } = props

    return <div className="project-detail-form">
        <div className="row">
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/projects">
                    Projects</Link>
                <Link color="inherit" href={"/project/" + project._id}>
                    <Typography color="textPrimary">{project.name}</Typography>
                </Link>
            </Breadcrumbs>
        </div>
        <div className="row">
            <Typography variant="h5">Details</Typography>
            <DotIconMenu className="delete-project-icon" >
                <MenuItem onClick={removeProject}>Move to Trash</MenuItem>
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
                    disabled={true}
                    onChange={handleChange}
                    value={values.key}
                />
                <InputLabel className="row" id="category">Category</InputLabel>
                <Field
                    className="select full"
                    component={Select}
                    labelId="category" id="select" name="category"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.category}
                >
                    {categoryItems}
                </Field>
                <InputLabel className="row" id="default_assignee">Default Assignee</InputLabel>
                <Field
                    className="select full"
                    component={Select}
                    labelId="default_assignee" id="default_assignee" name="default_assignee"
                    variant="outlined"
                    onChange={handleChange}
                    value="Project Lead"
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

    mapPropsToValues: ({ project }) => ({
        name: project.name,
        key: project.key,
        category: project.category,
        assignee: project.default_assignee
    }),

    // Custom sync validation
    validate: values => {
        const errors = {}
        if (!values.name) {
            errors.name = 'Required';
        }
        return errors;
    },
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values);
    },

    displayName: 'BasicForm',
})(ProjectDetailForm);

const ProjectDetailController = () => {
    const dispatch = useDispatch()
    const currentProject = useSelector(state =>selectCurrentProject(state))

    const handleUpdate = values => {
        dispatch(updateProject(currentProject._id, values))
    }

    function removeProject() {
        dispatch(deleteProject(currentProject._id))
    }

    return (<ProjectDetail onContinue={handleUpdate} project={currentProject} removeProject={removeProject} />)
}

export default ProjectDetailController

