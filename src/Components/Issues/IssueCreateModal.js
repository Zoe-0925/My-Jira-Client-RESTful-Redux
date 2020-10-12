import React, { useState } from 'react';
import { useSelector } from "react-redux"
import { Form, Field, withFormik } from 'formik';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Select from 'react-select';
import { Container, Row, Col } from 'reactstrap';
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
    ListItem
} from '@material-ui/core';
import * as Yup from 'yup';
import {
    TextField,
} from 'formik-material-ui';
import CreateIcon from '@material-ui/icons/Create';
import { SingleSelect, MultiSelect } from "./CustomSelect"
import CustomModal from "../Shared/CustomModal"
import {
    selectCurrentProjectName, selectProjects,
    selectMemberNames, selectLabelNames, selectUserById
} from "../../Reducers/Selectors"
import { Member } from "./AvatorCard"

const IssueForm = props => {
    const {
        values,
        handleChange,
        handleSubmit,
        closeModal,
        setFieldValue,
        isSubmitting,
    } = props


    const projectName = useSelector(selectCurrentProjectName)

    function showEpic() {

        //TODO
        //If there's no epic,
        //Pop the dialogue

    }

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

    return <div className="issue-form-in-modal">
        <Container>
            <Row>
                <Breadcrumbs aria-label="breadcrumb">
                    <div>
                        <CreateIcon className="cursor" size="small" onClick={showEpic} />
                        <Link color="inherit" href="/" onClick={showEpic}>
                            Add epic</Link>
                    </div>
                </Breadcrumbs>
            </Row>
            <div className="left">
                <Form onSubmit={handleSubmit}>
                    <InputLabel className="row" id="state">Project Name*</InputLabel>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="issueType"
                        defaultValue={projectOptions[0]}
                        options={projectOptions}
                        onChange={(e) => setFieldValue("projectName", e.value)}
                    />
                    <InputLabel className="row" id="state">Issue Type*</InputLabel>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="issueType"
                        defaultValue={issueTypeOptions[0]}
                        options={issueTypeOptions}
                        onChange={(e) => setFieldValue("issueType", e.value)}
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
                    <TextareaAutosize
                        className="row full-length-center"
                        name="description"
                        type="text"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setFieldValue("issueType", e.target.value)}
                        margin="normal"
                        aria-label="minimum height" rowsMin={15}
                    />
                    <div className="row right-align btn-row">
                        <ListItem><p className="cancel-btn" onClick={closeModal}>Cancel</p></ListItem>
                        <Button className="navbar-create-btn" disabled={isSubmitting} onClick={handleSubmit}>Create</Button>
                    </div>
                </Form>
            </div>

        </Container>
    </div>
}

const IssueCreateView = withFormik({
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
        console.log("values", values)
        onContinue(values)
    },
    displayName: 'MyForm',
})(IssueForm);

export default IssueCreateView

/**
export default function IssueModal({ open, closeModal, issue }) {
    const dispatch = useDispatch()

    const submitIssueUpdate = () => {
        // TODO
        //dispatch update issue

    }

    return (
        <CustomModal open={open} closeModal={closeModal}>
            <IssueView issue={issue} onContinue={submitIssueUpdate} />
        </CustomModal>
    )
}
 */