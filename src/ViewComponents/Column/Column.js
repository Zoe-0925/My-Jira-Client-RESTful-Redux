import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { MenuItem} from '@material-ui/core';
import { AddTab, DotIconMenu } from "../Shared/Tabs"
import { updateSuccessfulStatus, deleteSuccessfulStatus } from "../../Components/Status/Actions"
/**--------------Editable Textfiled-------------- */
import { EditableText, Input, Textarea } from "../Shared/EditableText"
/**--------------Icons-------------- */
import {  useEditText, useColumnController } from './CustomHooks';


/**
 * If there's no task yet, the user has to add from the "TO DO/ the 1st" column 
 */
//ColumnTitle tracks the "Status" model
function ColumnTitle({ status }) {
    const { state, setState, edit, setEdit } = useEditText(status.name)
    const dispatch = useDispatch()
    console.log("status in title", status)

    return (
        <div className="flex-row epic-title" id={status !== undefined ? status.id : ""}>
            <EditableText name="epic-summary" className="epic-summary"
                setEdit={setEdit} edit={edit} value={state.value}>
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
    const { showNewEditable, setShowEditable, createNewTask } = useColumnController()
    const { state, setState, setEdit } = useEditText()

    useEffect(() => {
        setState(initialStatus)
        console.log("initialState", initialStatus)
    }, [initialStatus])

    return (<div className="epic-box">
        <ColumnTitle status={state} />
        {props.children}
        {!showNewEditable && <AddTab operationName="Create issue" handleClick={() => { setShowEditable(true) }} className="create-issue-tab" />}
        {showNewEditable && <EditableText className="editable-create-issue" edit={true}>
            <Textarea state={state} setState={setState} setEdit={setEdit}
                handleSubmit={() => { createNewTask(state) }} />
        </EditableText>}
    </div>
    )
}