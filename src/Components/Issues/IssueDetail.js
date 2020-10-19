import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IssueSummaryInput, IssueDescriptionInput } from "./IssueInputField"
import { Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
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
import CreateIcon from '@material-ui/icons/Create';
import { SingleSelect, MultiSelect } from "./CustomSelect"
import CustomModal from "../Shared/CustomModal"
import {
    selectStatusById, selectStatus, selectLabels,
    selectMemberNames, selectLabelNames, selectUserById
} from "../../Reducers/Selectors"
import { Member } from "./AvatorCard"
import { useEditText } from "../Shared/CustomHooks"
import CommentHOC from "../Comment/CommentHOC"

const StatusSelect = ({ statusId }) => {
    const defaultStatus = useSelector(selectStatusById(statusId))
    const allStatus = useSelector(selectStatus)
    const currentOption = { label: defaultStatus.name, value: defaultStatus }
    let statusOptions = []
    allStatus.forEach(each => statusOptions.push({ label: each.name, value: each }))

    const updateStatus = (status) => {
        //TODO
        //call the thunk to update the store and also call the api call
    }



    return <Select
        className="select"
        classNamePrefix="select"
        name="issueType"
        defaultValue={currentOption}
        options={statusOptions}
        onChange={(e) => updateStatus(e.value)}
    />
}

const IssueDetailForm = ({ issue }) => {
    const [clicked, setClicked] = useState({ assignee: false, labels: false, reportee: false })
    const issueParsed = issue.values().next().value //Extract the issue object from the map
    const assignee = useSelector(selectUserById(issueParsed.assignee))
    const reportee = useSelector(selectUserById(issueParsed.reportee))
    const currentLabels = []

    //TODO call the thunk to get all users, and save to the store
    const assigneeOptions = []

    const labelOptions = useSelector(selectLabels).map(each => {
        return { label: each.name, value: each }
    })

    const reporteeOptions = ["Jira Outlook", "Jira Service Desk Widget",
        "Jira Spreadsheets", "Statuspage for Jira", "Trello"].map(each => {
            return { label: each, value: each }
        })

    //TODO
    // Call the thunk to get a list of user objects
    // and then select them from the store
    const projectMembers = []

    function showEpic() {

        //TODO
        //If there's no epic,
        //Pop the dialogue

    }

    const updateAssignee = (value) => {

    }

    const updateReportee = (value) => {

    }

    const updateLabel = () => {
        //TODO
        // Dunno how to update the multple labels

    }


    //TODO
    // use effect for updated time


    return <div className="issue-detail-form">
        <Breadcrumbs aria-label="breadcrumb">
            <div>
                <CreateIcon className="cursor" size="small" onClick={showEpic} />
                <Link color="inherit" href="/" onClick={showEpic}>
                    Add epic</Link>
            </div>
        </Breadcrumbs>
        <Container>
            <IssueSummaryInput id={issueParsed._id} summary={issueParsed.summary} />
            <p className="label">Description</p>
            <IssueDescriptionInput id={issueParsed._id} description={issueParsed.description} />
            <CommentHOC/>
            <StatusSelect statusId={issueParsed.status} />
            <Row></Row>
            <p className="label">Assignee</p>
            <Select
                className="select"
                classNamePrefix="select"
                name="assignee"
                defaultValue={{ label: assignee.name, value: assignee }}
                options={assigneeOptions}
                onChange={(e) => updateAssignee(e.value)}
                isClearable={true}
            />
            <Row></Row>
            <p className="label">Labels</p>
            <Select
                className="select"
                classNamePrefix="select"
                isMulti
                name="labels"
                defaultValue={currentLabels}
                options={labelOptions}
                onChange={(e) => updateLabel(e.value)}
                isClearable={true}
            />
            <Row></Row>
            <p className="label">Reporter</p>
            <Select
                className="select"
                classNamePrefix="select"
                name="reportee"
                defaultValue={{ label: reportee.name, value: reportee }}
                options={reporteeOptions}
                onChange={(e) => updateReportee(e.value)}
            />
            <Row></Row>
            <Divider />
            <Row></Row>
            <p className="time">{"Created " + issueParsed.created}</p>
            <p className="time">{"Updated " + issueParsed.updated}</p>
        </Container>
    </div>
}

export default IssueDetailForm


