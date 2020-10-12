import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Form, Field, withFormik } from 'formik';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    selectCurrentProjectName, selectMemberNames, selectLabelNames, selectUserById
} from "../../Reducers/Selectors"
import { Member } from "./AvatorCard"

const IssueForm = props => {
    const {
        values,
        handleChange,
        handleSubmit,
        closeModal,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        issue,
    } = props

    const [clicked, setClicked] = useState({ assignee: false, labels: false, reportee: false })

    const issueParsed = issue.values().next().value //Extract the issue object from the map
    const assignee = useSelector(selectUserById(issueParsed.assignee))
    const reportee = useSelector(selectUserById(issueParsed.reportee))
    const memberNames = useSelector(selectMemberNames)
    const labelNames = useSelector(selectLabelNames)
    const projectName = useSelector(selectCurrentProjectName)

    function showEpic() {

        //TODO
        //If there's no epic,
        //Pop the dialogue

    }

    return <div className={"issue-form-in-modal"}>
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

                    <Col><Typography color="textPrimary">Project Name*</Typography></Col>
                    <Col><Typography color="textPrimary">{projectName}</Typography></Col>

                    <Row>

                    </Row>
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
                        value={issue.issueType || values.issueType}
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
                        value={issue.summary || values.summary}
                        margin="normal"
                    />
                    <InputLabel className="row" id="state">description*</InputLabel>
                    <Field
                        className="row full-length-center"
                        component={TextareaAutosize}
                        name="description"
                        type="text"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        value={issue.description || values.description}
                        margin="normal"
                        aria-label="minimum height" rowsMin={15}
                    />
                    <div className="row right-align btn-row">
                        <ListItem><p className="cancel-btn" onClick={closeModal}>Cancel</p></ListItem>
                        <Button className="navbar-create-btn" disabled={isSubmitting} onClick={handleSubmit}>Create</Button>
                    </div>
                </Form>
            </div>
            <div className="right">
                <Typography variant="caption" display="block" gutterBottom>Assignee</Typography>
                {!clicked.assignee &&
                    <Member user={assignee} onClick={() => setClicked({ assignee: true, labels: false, reportee: false })} />}
                {clicked.assignee &&
                    <SingleSelect onChange={setFieldValue} onBlur={setFieldTouched} defaultValue={assignee.name} options={memberNames} type="assignee" />}
                <Typography variant="caption" display="block" gutterBottom>Labels</Typography>
                {!clicked.labels && <Member user={assignee} onClick={() => setClicked({ assignee: false, labels: true, reportee: false })} />}
                {clicked.labels &&
                    <MultiSelect onChange={setFieldValue} onBlur={setFieldTouched} options={labelNames} type="labels" />}
                <Typography variant="caption" display="block" gutterBottom>Reporter</Typography>
                {!clicked.reportee && <Member user={assignee} onClick={() => setClicked({ assignee: true, labels: false, reportee: false })} />}
                {clicked.reportee &&
                    <SingleSelect onChange={setFieldValue} onBlur={setFieldTouched} defaultValue={reportee.name} options={memberNames} type="reportee" />}
            </div>
        </Container>
    </div>
}

const IssueView = withFormik({
    validationSchema: Yup.object().shape({
        summary: Yup.string()
            .required('Summary is required!')
    }),
    mapPropsToValues: (issue) => ({
        projectName: issue.projectName,
        issueType: issue.issueType,
        summary: issue.summary,
        description: issue.description,
        assignee: issue.assignee,
        labels: issue.labels,
        reportee: issue.reportee,
    }),
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values)
    },
    displayName: 'MyForm',
})(IssueForm);

export default IssueView

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