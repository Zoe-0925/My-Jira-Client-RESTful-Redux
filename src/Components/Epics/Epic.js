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

function EpicTitle({ epicSummary, epicId, handleChange }) {
    const contentEditable = useRef()

    const onChange = e => {
        if (e.target.value !== "" && e.target.value !== epicSummary) {
            handleChange(e.target.value)
        }
    }

    const deleteEpic = (id) => {
        //TODO
        //write a custom hook that
        //dispatch an action
        //that calls the server to delete the epic
    }

    return (
        <div className="flex-row epic-title" id={epicId}>
            <ContentEditable
                className="epic-summary"
                innerRef={contentEditable}
                html={epicSummary} // innerHTML of the editable div
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
                <MenuItem onClick={() => deleteEpic(epic.id)}>Delete</MenuItem>
            </DotIconMenu>
        </div>
    )
}

function EpicBody({ task, opentask }) {
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

export default function Epic({ epic }) {
    const [epicSummary, setEpicSummary] = useState(epic.summary || "")
    const [tasksDisplayed, setTasksDisplayed] = useState([])
    const [newTask, setNewTask] = useState("")
    const [showNewEditable, setShowEditable] = useState(false)

    //And then display them under different columns accordingly

    const { value, handleTrue, handleFalse } = useSimpleState()
    const createIssueEditable = useRef()

    useEffect(() => {
        if (epic.summary !== undefined) {
            setEpicSummary(epic.summary)
        }
    }, [epic.summary])

    useEffect(() => { //Load the tasks from props to local state only once.
        if (epic.tasks !== undefined && tasksDisplayed.length === 0) {
            setTasksDisplayed(epic.tasks)
        }
    }, [])

    const changeEpicSummary = (value) => {
        setEpicSummary(value)
        //TODO 
        //call the server to update it.

        //TODO 
        //On change,
        //Change epic Summary
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
        <EpicBody key={each.id} task={each} opentask={opentask} />)

    return (<div className="epic-box">
        <EpicTitle epicSummary={epicSummary} epicId={epic.id} handleChange={changeEpicSummary} />
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