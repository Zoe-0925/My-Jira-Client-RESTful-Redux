import React, { useState, useEffect } from 'react'
import { MenuItem, Tooltip } from '@material-ui/core';
import { AddTab, DotIconMenu } from "../Shared/Tabs"
/**--------------Editable Textfiled-------------- */
import { EditableText, Input, Textarea } from "../Shared/EditableText"
/**--------------Icons-------------- */
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useStatusChange, useEditText, useColumnController } from './CustomHooks';


/**
 * If there's no task yet, the user has to add from the "TO DO/ the 1st" column 
 */
//ColumnTitle tracks the "Status" model
function ColumnTitle({ columnSummary, columnId }) {
    const { state, setState, edit, setEdit } = useEditText(columnSummary)

    return (
        <div className="flex-row epic-title" id={columnId}>
            <EditableText name="epic-summary" className="epic-summary"
                setEdit={setEdit} edit={edit} value={state.value}>
                <Input state={state} setState={setState} setEdit={setEdit} />
            </EditableText>
            <DotIconMenu className="dot-icon">
                <MenuItem>Set column limit</MenuItem>
                <MenuItem onClick={() => dispatch(deleteStatus(column.id))}>Delete</MenuItem>
            </DotIconMenu>
        </div>
    )
}

function ColumnBody({ task, opentask }) {
    const labelsFormatted = task === undefined || task.labels.length === 0 ? "" :
        task.labels.map(each => <p className="label">{each}</p>)

    if (task.issueType === undefined || task.summary === undefined) { return <div></div> }

    return (
        <div className="epic-body" onClick={() => openTask(task._id)}>
            <p className="summary">{task.summary}</p>
            <div className="labels">{labelsFormatted}</div>
            <div className="issueType tab row">
                <div>
                    <Tooltip title={task.issueType} aria-label={task.issueType}>
                        {task.issueType === "Task" ?
                            <CheckBoxIcon style={{ color: "#5BC2F2" }} /> : <AllInboxIcon style={{ color: "#A64BED" }} />}
                    </Tooltip>
                    <Tooltip title={task.summary} aria-label={task.summary}>{task.summary}</Tooltip>
                </div>
                <Tooltip title={task.assignee} aria-label={task.assignee}><AccountCircleIcon /></Tooltip>
            </div>
        </div>

    )
}

function CreateIssue({ handleClick }) {

    return (
        <AddTab operationName="Create issue" handleClick={handleClick} className="create-issue-tab" />
    )

}

//TODO wait!!!
//Title should be a list as well......

export default function Columns() {

    const { loading, status } = useStatusChange()
    const { epicData, showNewEditable, setShowEditable,opentask } = useColumnController()
    const { state, setState, edit, setEdit } = useEditText("")


    //TODO
    //useEffect or useSelector:
    //When a new task is inserted, append it to the data list

    const tasks = epicData===undefined||epicData.length <= 0 ? "" : epicData.map(each =>
        <ColumnBody key={each.id} task={each} opentask={opentask} />)

    return (<div className="epic-box">
        <ColumnTitle columnSummary={status.name} columnId={status.id} />
        {tasks}
        {!showNewEditable && <CreateIssue handleClick={() => { setShowEditable(true) }} />}
        {showNewEditable && <EditableText className="editable-create-issue" edit={true}>
            <Textarea state={state} setState={setState} setEdit={setEdit}
                handleSubmit={() => { setShowEditable(false) }} />
        </EditableText>}
    </div>
    )
}

//TODO 
//Add issue modal here
