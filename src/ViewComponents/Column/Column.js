import React from 'react'
import { useDispatch } from "react-redux"
import { MenuItem, Tooltip } from '@material-ui/core';
import { AddTab, DotIconMenu } from "../Shared/Tabs"
import { updateSuccessfulStatus, deleteSuccessfulStatus } from "../../Components/Status/Actions"
/**--------------Editable Textfiled-------------- */
import { EditableText, Input, Textarea } from "../Shared/EditableText"
/**--------------Icons-------------- */
import { useStatusChange, useEditText, useColumnController } from './CustomHooks';


/**
 * If there's no task yet, the user has to add from the "TO DO/ the 1st" column 
 */
//ColumnTitle tracks the "Status" model
function ColumnTitle({ status }) {
    const { state, setState, edit, setEdit } = useEditText(status !== undefined && status.name)
    const dispatch = useDispatch()

    return (
        <div className="flex-row epic-title" id={status !== undefined ? status.id : ""}>
            <EditableText name="epic-summary" className="epic-summary"
                setEdit={setEdit} edit={edit} value={state.value}>
                <Input state={state} setState={setState} setEdit={setEdit} handleSubmit={() => {
                    dispatch(updateSuccessfulStatus(state))
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
export function SingleColumn({ initialStatus, ...props }) {
    const { showNewEditable, setShowEditable, createNewTask } = useColumnController()
    const { state, setState, setEdit } = useEditText(initialStatus !== undefined && initialStatus.name)

    return (<div className="epic-box">
        <ColumnTitle columnSummary={state.name} columnId={initialStatus !== undefined ? initialStatus.id : ""} />
        {props.children}
        {!showNewEditable && <AddTab operationName="Create issue" handleClick={() => { setShowEditable(true) }} className="create-issue-tab" />}
        {showNewEditable && <EditableText className="editable-create-issue" edit={true}>
            <Textarea state={state} setState={setState} setEdit={setEdit}
                handleSubmit={(e) => { createNewTask(e.target.value) }} />
        </EditableText>}
    </div>
    )
}


export default function Columns() {

    const { loading, status } = useStatusChange()
    const { epicData, showNewEditable, setShowEditable, opentask } = useColumnController()
    const { state, setState, edit, setEdit } = useEditText("")


    //TODO
    //useEffect or useSelector:
    //When a new task is inserted, append it to the data list



    //TODO
    //epic-box should be a single box
    return (<div className="epic-box">
        <ColumnTitle columnSummary={status.name} columnId={status.id} />
        {!showNewEditable && <AddTab operationName="Create issue" handleClick={() => { setShowEditable(true) }} className="create-issue-tab" />}
        {showNewEditable && <EditableText className="editable-create-issue" edit={true}>
            <Textarea state={state} setState={setState} setEdit={setEdit}
                handleSubmit={() => { setShowEditable(false) }} />
        </EditableText>}
    </div>
    )
}

//TODO 
//Add issue modal here
