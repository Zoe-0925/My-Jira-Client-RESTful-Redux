import React from "react";
import { IssueDotIconMenu } from "../Shared/Tabs"
import { Tooltip } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { v4 as uuidv4 } from 'uuid'

const IssueCard = ({ task, openTaskDetail }) => {

    return (
        <div key={uuidv4()} className={!task.flag ? "epic-body" : "epic-body flagged"}>
            <div className="col">
                <p className="summary" onClick={() => openTaskDetail(task)}>{task.summary}</p>
                <div className="labels" onClick={() => openTaskDetail(task)}>{task.labels.length !== 0 && task.labels.map(each => <p key={uuidv4()} className="label">{each}</p>)}</div>
                <div className="issueType tab row" onClick={() => openTaskDetail(task)}>
                    <div>
                        <Tooltip title={task.issueType} aria-label={task.issueType}>
                            <CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} />
                        </Tooltip>
                        <p>{task.summary}</p>
                    </div>
                </div>
                <div className="col">
                    <IssueDotIconMenu id={task._id} flag={task.flag} />
                    <Tooltip title={task.assignee} aria-label={task.assignee}><AccountCircleIcon onClick={() => openTaskDetail(task)} /></Tooltip>
                </div>
            </div>
        </div>
    )
}

export default IssueCard