import React, { useState, Fragment } from 'react';
import { useSelector } from "react-redux"
import { Form, Field, withFormik } from 'formik';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Button,
    Divider,
    Box,
    Link,
    Breadcrumbs,
    Typography,
    InputLabel,
    InputAdornment,
    IconButton,
    TextareaAutosize,
} from '@material-ui/core';
import {
    TextField,
} from 'formik-material-ui';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CreateIcon from '@material-ui/icons/Create';
import CustomModal from "../Shared/CustomModal"
import { useSimpleState } from "../Shared/CustomHooks"
import { selectCurrentProjectName, selectLabels } from "../../Reducers/Selectors"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 4, 3),
        color: "black"
    },
}));

const IssueForm = props => {
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

    function showEpic() {

        //TODO
        //If there's no epic,
        //Pop the dialogue

    }

    const projectName = useSelector(selectCurrentProjectName)
    const classes = useStyles();

    return <div className={classes.paper + " Issue-form-wide"}>
        <div className="row">
            <Breadcrumbs aria-label="breadcrumb">
                <div>
                    <CreateIcon className="cursor" size="small" onClick={showEpic} />
                    <Link color="inherit" href="/" onClick={showEpic}>
                        Add epic</Link>
                </div>
                <Typography color="textPrimary">{projectName}</Typography>
            </Breadcrumbs>
        </div>
        <Form onSubmit={handleSubmit}>
            <InputLabel className="row" id="state">Project Name*</InputLabel>
            <Field
                className="form-select row"
                id="select"
                component={TextField}
                name="projectName"
                type="text"
                variant="outlined"
                size="small"
                disabled={true}
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
                className="form-select row"
                id="select"
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
                className="row form-select full-length-center summary"
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

const IssueView = withFormik({
    mapPropsToValues: () => ({
        projectName: "",
        issueType: "",
        summary: "",
        description: ""
    }),

    // Custom sync validation
    validate: values => {

        const errors = {}

        return errors;
    },
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values);
    },

    displayName: 'BasicForm',
})(IssueForm);

export default IssueView