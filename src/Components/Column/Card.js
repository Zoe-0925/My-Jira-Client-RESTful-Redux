import React from "react";
import { useDispatch } from "react-redux"
import { Tooltip, MenuItem, Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Container, Row, Col } from 'reactstrap';
import { DotIconMenu } from "../Shared/Tabs"
import { v4 as uuidv4 } from 'uuid'

const IssueCard = ({ task, openTaskDetail }) => {
    const dispatch = useDispatch()

    //TODO
    const toggleFlag = (id) => {
        // dispatch toggle flag
    }

    const deleteIssue = (id) => {
        // dispatch delete issue
    }

    const reorderToBotttom = (id) => {
        // maybe need the status id as well
    }


    return (
        <Box boxShadow={1}
            key={uuidv4()} className={!task.flag ? "epic-body" : "epic-body flagged"}>
            <Container>
                <Row className="mt-0">
                    <Col sm="10" onClick={() => openTaskDetail(task)}>
                        <p>{task.summary}</p>
                    </Col>
                    <Col sm="2">
                        <DotIconMenu className="dot-icon">
                            <MenuItem onClick={() => dispatch(toggleFlag(task._id))}>{!task.flag ? "Add flag" : "Remove flag"}</MenuItem>
                            <MenuItem >Add parent</MenuItem>
                            <MenuItem >Add label</MenuItem>
                            <MenuItem onClick={() => dispatch(deleteIssue(task._id))}>Delete</MenuItem>
                            <MenuItem onClick={() => dispatch(reorderToBotttom(task._id))} >Bottom of column</MenuItem>
                        </DotIconMenu>
                    </Col>
                </Row>
                <Row className="mt-0">
                    {task.labels.length !== 0 && task.labels.map(each => <Col><p key={uuidv4()} className="label">{each}</p></Col>)}
                </Row>
                <Row className="mt-0" onClick={() => openTaskDetail(task)}>
                    <Col sm="1">
                        <Tooltip title={task.issueType} aria-label={task.issueType}>
                            <CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} />
                        </Tooltip>
                    </Col>
                    <Col sm="8">
                        <p>{task.summary}</p>
                    </Col>
                    <Col sm="1">
                        <Tooltip title={task.assignee} aria-label={task.assignee}>
                            <AccountCircleIcon /></Tooltip>
                    </Col>
                </Row>
            </Container>
        </Box>
    )
}

export default IssueCard