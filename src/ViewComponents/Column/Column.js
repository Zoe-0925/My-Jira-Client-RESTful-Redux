import React, { Fragment, useState, useRef, useEffect } from 'react'
import { MenuItem, Tooltip, ClickAwayListener, TextField } from '@material-ui/core';
import { AddTab, DotIconMenu } from "../Shared/Tabs"
import { useSimpleState } from "../Shared/CustomHooks"
import InlineEdit from "../Shared/InlineText"
import { v4 as uuidv4 } from 'uuid'
/**--------------Editable Textfiled-------------- */
import ContentEditable from 'react-contenteditable'
/**--------------Icons-------------- */
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


/**
 * If there's no task yet, the user has to add from the "TO DO/ the 1st" column 
 */

function ColumnTitle({ columnSummary, columnId, handleChange }) {
    const contentEditable = useRef()

    const onChange = e => {
        if (e.target.value !== "" && e.target.value !== columnSummary) {
            handleChange(e.target.value)
        }
    }

    const deletecolumn = (id) => {
        //TODO
        //write a custom hook that
        //dispatch an action
        //that calls the server to delete the column
    }

    return (
        <div className="flex-row epic-title" id={columnId}>
            <ContentEditable
                className="epic-summary"
                innerRef={contentEditable}
                html={columnSummary} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={onChange} // handle innerHTML change
                onKeyUp={e => {
                    e.preventDefault();
                    if (e.key == 'Enter' && (e.target.value !== "" || undefined)) {
                        console.log("enter pressed")

                    }
                }}
            />
            <DotIconMenu className="dot-icon">
                <MenuItem>Set column limit</MenuItem>
                <MenuItem onClick={() => deleteColumn(column.id)}>Delete</MenuItem>
            </DotIconMenu>
        </div>
    )
}

function ColumnBody({ task, opentask }) {
    const labelsFormatted = task === undefined || task.labels.length === 0 ? "" :
        task.labels.map(each => <p className="label">{each}</p>)

    if (task.issueType === undefined || task.summary === undefined) { return <div></div> }


    return (
        <div className="epic-body" onClick={() => openTask(task.id)}>
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

export default function Column({ column }) {
    const [columnSummary, setColumnSummary] = useState(column.summary ||"")
    const [tasksDisplayed, setTasksDisplayed] = useState([])
    const [newTask, setNewTask] = useState("")
    const [showNewEditable, setShowEditable] = useState(false)

    //And then display them under different columns accordingly

    const { value, handleTrue, handleFalse } = useSimpleState()
    const createIssueEditable = useRef()

    useEffect(() => {
        if (column.summary !== undefined) {
            setColumnSummary(column.summary)
        }
    }, [column.summary])

    useEffect(() => { //Load the tasks from props to local state only once.
        if (column.tasks !== undefined && tasksDisplayed.length === 0) {
            setTasksDisplayed(column.tasks)
        }
    }, [])

    const changeColumnSummary = (value) => {
        setColumnSummary(value)
        //TODO 
        //call the server to update it.

        //TODO 
        //On change,
        //Change Column Summary
        //And XSS
    }

    const createNewTask = () => {

    }

    const opentask = (id) => {
        //TODO
        //get the task object from the state
        //change the modal open status
        //and pop the task data into the modal
    }

    const tasks = tasksDisplayed.length <= 0 ? "" : tasksDisplayed.map(each =>
        <ColumnBody key={each.id} task={each} opentask={opentask} />)

    return (<div className="epic-box">
        <ColumnTitle columnSummary={columnSummary} columnId={column.id} handleChange={changeColumnSummary} />
        {tasks}
        {!showNewEditable && <CreateIssue handleClick={() => { setShowEditable(true) }} />}
        {showNewEditable && <div className="editable-container">
            <InlineEdit text="" onSetText={(e) => { console.log(e) }} />
        </div>}

        
    </div>
    )
}

        //TODO 
//Add issue modal here