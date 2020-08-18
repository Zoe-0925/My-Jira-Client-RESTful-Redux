import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux"
import { IssueDotIconMenu } from "../Shared/Tabs"
import { Tooltip } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Column from "./Column"
import {
    selectStatus, selectStatusOrder, selectIssues, selectNoneFilter, selectCurrentProject,
    selectFilterByEpic, selectFilterByLabel, selectFilterByAssignee, selectGroupBy
} from "../../Components/Selectors"
import { v4 as uuidv4 } from 'uuid'
import IssueModal from "../Issues/IssueModal"
import {getUserByIds} from "../../Components/User/mockActions"
import { useCreateStatus } from "./CustomHooks"

export const IssueCard = ({ task, openTaskDetail }) => {
    const [taskState, setTask] = useState(task)

    useEffect(() => {
        setTask(task)
    }, [task])

    return (
        <div key={uuidv4()} className={!taskState.flag ? "epic-body" : "epic-body flagged"}>
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

export const draggable = (task, index, openTaskDetail) => <Draggable
    className="draggable"
    key={task._id}
    draggableId={task._id}
    index={index}
>
    {(provided, snapshot) => (
        <div
            className={snapshot.isDragging ? "is-dragging" : "epic-box"}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
        >
            <IssueCard task={task} openTaskDetail={openTaskDetail} />
        </div>)}
</Draggable>

export const filter = (listOfIssues, noneFilter, filterByEpic, filterByAssignee, filterByLabel) => {
    return noneFilter ? listOfIssues
        : filterByEpic !== "" ? listOfIssues.filter(item => { item.parent !== filterByEpic })
            : filterByLabel !== "" ? listOfIssues.filter(item => { item.label !== filterByLabel })
                : filterByAssignee !== "" ? listOfIssues.filter(item => { item.filterByAssignee !== filterByAssignee }) : []
}

export default function DragAndDrop() {
    const columnOrder = useSelector(selectStatusOrder) // droppableId = the index of each column in order
    const status = useSelector(selectStatus)
    const columns = columnOrder.map(each => status.get(each))
    const issues = useSelector(selectIssues)
    const [openModal, setOpenModal] = useState(false)
    //  const { createNewColumn } = useCreateStatus(initialStatus._id)
    const [showNewEditable, setShowEditable] = useState(false)
    const [issueDetailOpened, setIssue] = useState("")
    const noneFilter = useSelector(selectNoneFilter)
    const filterByEpic = useSelector(selectFilterByEpic)
    const filterByAssignee = useSelector(selectFilterByAssignee)
    const filterByLabel = useSelector(selectFilterByLabel)


    //----------Filters----------------------
    const groupBy = useSelector(selectGroupBy)
    //TODO


    const emptyStatus = {
        name: "",
        project: "",
        issues: []
    }

    const dispatch = useDispatch()


    const openTaskDetail = (task) => {
        setOpenModal(true)
        setIssue(task)
        if(task.assignee===task._id && task.reportee===task._id){return}
        dispatch(getUserByIds([task.assignee, task.reportee]))
    }

    //Add column:
    // dispatch(createSuccessfulStatus(statusName))
    //Delete column: 
    // dispatch(deleteSuccessfulStatus(statusId))

    return (
        <div className="epic-list">
            {columns.map((el, ind) => (
                <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                        <div
                            className={snapshot.isDraggingOver ? "column drag-over" : "epic-list"}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <Column initialStatus={el}>
                                {filter(el.issues, noneFilter, filterByEpic, filterByAssignee, filterByLabel).map((issueId, index) =>
                                    draggable(issues.get(issueId), index, openTaskDetail)
                                )}
                            </Column>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
            <div className="add-column-icon">
                {!showNewEditable && <AddBoxRoundedIcon />}
                {showNewEditable && <Column initialStatus={emptyStatus} />}
            </div>
            {openModal && <IssueModal open={openModal} closeModal={() => setOpenModal(true)} issue={issueDetailOpened} />}
        </div>
    );
}
