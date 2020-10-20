import React, { Fragment, useState } from 'react';
import { useSelector } from "react-redux"
import { Form, Field, withFormik } from 'formik';
import Select from 'react-select';
import { Container, Row, Col } from 'reactstrap';
import {
    Button,
    Divider,
    Typography,
    InputLabel,
    TextareaAutosize,
    IconButton,
    DialogActions, Dialog
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import {
    TextField,
} from 'formik-material-ui';
import {
    selectCurrentProjectName, selectProjects,
    selectMemberNames, selectLabelNames, selectUserById
} from "../../Reducers/Selectors"

const IssueForm = props => {
    const {
        values,
        handleChange,
        handleSubmit,
        handleClose,
        setFieldValue,
        isSubmitting,
    } = props

    const projects = useSelector(selectProjects)
    const projectOptions = projects.map(each => {
        return {
            value: each._id, label: each.name
        }
    })

    const issueTypeOptions = [
        { value: 'task', label: 'task' },
        { value: 'epic', label: 'epic' },
    ]

    return <Fragment>
        <MuiDialogTitle disableTypography className="title">
            <Row>
                <Col xs lg="11"></Col>
                <Col xs lg="1">
                    <IconButton aria-label="close" className="close-btn" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Col>
            </Row>
        </MuiDialogTitle>
        <div className="issue-form-in-modal">
            <Container>
                <p className="title">Create issue</p>
                <Row>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <InputLabel className="form-label" id="projectName">Project Name*</InputLabel>
                    <Select
                        className="select"
                        classNamePrefix="select"
                        name="issueType"
                        defaultValue={projectOptions[0]}
                        options={projectOptions}
                        onChange={(e) => setFieldValue("projectName", e.value)}
                    />
                    <Row>
                    </Row>
                    <InputLabel className="form-label" id="issueType">Issue Type*</InputLabel>
                    <Select
                        className="select"
                        classNamePrefix="select"
                        name="issueType"
                        defaultValue={issueTypeOptions[0]}
                        options={issueTypeOptions}
                        onChange={(e) => setFieldValue("issueType", e.value)}
                    />
                    <Typography variant="caption">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</Typography>
                    <Row>
                    </Row>
                    <Divider />
                    <Row>
                    </Row>
                    <InputLabel className="form-label" id="summary">Summary*</InputLabel>
                    <Field
                        className="field"
                        component={TextField}
                        name="summary"
                        type="text"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        value={values.summary}
                        margin="normal"
                    />
                    <InputLabel className="form-label" id="state">description*</InputLabel>
                    <TextareaAutosize
                        className="field"
                        name="description"
                        type="text"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setFieldValue("issueType", e.target.value)}
                        margin="normal"
                        aria-label="minimum height" rowsMin={15}
                    />
                    <DialogActions>
                        <Button className="cancel-btn" disabled={isSubmitting} onClick={handleClose}>Cancel</Button>
                        <Button className="navbar-create-btn" disabled={isSubmitting} onClick={handleSubmit}>Create</Button>
                    </DialogActions>
                </Form>
            </Container>
        </div>
    </Fragment>
}

const IssueCreateContent = withFormik({
    validationSchema: Yup.object().shape({
        summary: Yup.string()
            .required('Summary is required!')
    }),
    mapPropsToValues: () => ({
        projectName: "",
        issueType: "task",
        summary: "",
        description: ""
    }),
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values)
    },
    displayName: 'MyForm',
})(IssueForm);

const IssueCreate = () => {
    const [open, setOpen] = useState(false)

    const submitCreateIssue = (value) => {
        //TODO
        //Thunk

        setOpen(false)
    }

    return (
        <Fragment>
            <Button className="navbar-create-btn" onClick={() => setOpen(true)}>Create</Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="max-width-dialog-title"
                maxWidth="lg"
                className="dialog-container"
            >
                <IssueCreateContent onContinue={submitCreateIssue} handleClose={() => setOpen(false)} />
            </Dialog>
        </Fragment>
    )
}

export default IssueCreate