import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { MenuItem } from '@material-ui/core';
import { AddTab, DotIconMenu } from "../Shared/Tabs"
import { updateSuccessfulStatus, deleteSuccessfulStatus } from "../../Actions/mockStatusActions"
/**--------------Editable Textfiled-------------- */
import { EditableText, Input, Textarea } from "../Shared/EditableText"
/**--------------Icons-------------- */
import { useEditText, useCreateIssue } from './CustomHooks';

/**
 * If there's no task yet, the user has to add from the "TO DO/ the 1st" column 
 */
//ColumnTitle tracks the "Status" model
function ColumnTitle({ status }) {
    const { state, setState, edit, setEdit } = useEditText(status.name)
    const dispatch = useDispatch()

    //updateSuccessfulStatus

    return (
        <div className="flex-row epic-title" id={status !== undefined ? status.id : ""}>
            <EditableText name="epic-summary" className="epic-summary"
                edit={edit} text={state.value || status.name} setEdit={setEdit}>
                <Input state={state} setState={setState} setEdit={setEdit} handleSubmit={() => {
                    dispatch(updateSuccessfulStatus(state.value))
                }} />
            </EditableText>
            <DotIconMenu className="dot-icon">
                <MenuItem>Set column limit</MenuItem>
                <MenuItem onClick={() => dispatch(deleteSuccessfulStatus(status.id))}>Delete</MenuItem>
            </DotIconMenu>
        </div>
    )
}



//Need the status id
export default function Column({ initialStatus, ...props }) {
    const { state, setState, setEdit } = useEditText(initialStatus.name)
    const { createNewTask } = useCreateIssue(initialStatus._id)
    const [showCreateTaskTab, setShowEditable] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setState(initialStatus)
    }, [])

    return (<div className="epic-box">
        <ColumnTitle status={state} />
        {props.children}
        {!showCreateTaskTab && <AddTab operationName="Create issue" handleClick={() => { setShowEditable(true) }} className="create-issue-tab" />}
        {showCreateTaskTab && <EditableText name="creare-new-task" className="editable-create-issue" edit={true}
            text={state.value || status.name} setEdit={setEdit}>
            <Input state={state} setState={setState} setEdit={setEdit} handleSubmit={() => {
                dispatch(createNewTask(state.value))
            }} />
        </EditableText>
        }
    </div>
    )
}

/**
 *         <Textarea state={state} setState={setState} setEdit={setEdit}
                handleSubmit={() => { createNewTask(state) }} />
 */