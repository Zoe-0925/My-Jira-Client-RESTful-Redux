import React, { useState, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Field } from 'formik';
import { withFormik } from 'formik';
import {
    Button,
    InputLabel,
    Divider,
    Box,
    TextareaAutosize,
    Modal
} from '@material-ui/core';
import {
    TextField,
} from 'formik-material-ui';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const menuItemFromServer = () => {
    //TODO
    //get user id
    //query the db to get all projects and recent projects

    const recentProjects = [{ name: "recent 1", id: "1" }].map(each => {
        <MenuItem value={each.id}>{each.name}</MenuItem>
    })
    const allProjects = [{ name: "recent 1", id: "1" }].map(each => {
        <MenuItem value={each.id}>{each.name}</MenuItem>
    })

    return <Fragment>
        <ListSubheader>Recent projects</ListSubheader>
        {recentProjects}
        <ListSubheader>All projects</ListSubheader>
        {allProjects}
    </Fragment>
}

const IssueForm = props => {
    const [formValue, setValue] = useState({
        email: "",
        password: ""
    })

    const {
        values,
        handleChange,
        handleSubmit,
        closeModal
    } = props


    function importIssue() {

    }

    function openFields() {

    }


    return <div className="Issue-form">
        <div className="row">
            <p className="form-title">Create issue</p>
            <div className="c"></div>
            <div className="right">
                <Button className="tab-btn" onClick={openFields}>Configure Fields<ExpandMoreIcon /></Button>
                <Button className="tab-btn" onClick={importIssue}>Import issues</Button>
            </div>
        </div>
        <Form onSubmit={handleSubmit}>
            <InputLabel className="row" id="state">Project Name*</InputLabel>
            <Field
                className="form-select"
                id="select"
                className="row"
                component={TextField}
                name="projectName"
                type="text"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.projectName}
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <ExpandMoreIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <InputLabel className="row" id="state">Issue Type*</InputLabel>
            <Field
                className="form-select"
                id="select"
                className="row"
                component={TextField}
                name="issueType"
                type="text"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.issueType}
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <ExpandMoreIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />


            <Typography className="row" variant="caption">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</Typography>
            <Box margin={1}>
                <Divider />
            </Box>
            <InputLabel className="row" id="state">Summary*</InputLabel>
            <Field
                className="form-select"
                className="row full-length-center summary"
                component={TextField}
                name="summary"
                type="text"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.summary}
                margin="normal"
            />
            <InputLabel className="row" id="state">description*</InputLabel>
            <Field
                className="full-length-center"
                className="row full-length-center summary"
                component={TextareaAutosize}
                name="description"
                type="text"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.description}
                margin="normal"
                aria-label="minimum height" rowsMin={15}
            />
            <div className="row right-align btn-row">
                <p className="cancel-btn" onClick={closeModal}>Cancel</p>
                <Button className="navbar-create-btn" onClick={handleSubmit}>Create</Button>
            </div>
        </Form>
    </div>
}

const CreateIssue = withFormik({
    mapPropsToValues: () => ({
        projectName: '',
        issueType: "",
        summary: ""
    }),

    // Custom sync validation
    validate: values => {
        const errors = {}

        //TODO
        //Combine this with select......
        return errors;
    },
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values);
    },

    displayName: 'BasicForm',
})(IssueForm);


const CreateIssueModal = ({open, closeModal}) => {

    return (
        <div>
            <Modal
                className="modal"
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <CreateIssue />
            </Modal>
        </div>
    )

}
export default CreateIssueModal


