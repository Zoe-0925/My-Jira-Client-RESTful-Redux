import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux"
import  {IssueDotIconMenu} from "../Shared/Tabs"
import {
    createSuccessfulStatus, deleteSuccessfulStatus,
} from "../../Components/Status/Actions"
import { deleteSuccessfulIssue, toggleFlag } from "../../Components/Issue/Actions"
import { Tooltip } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Column from "./Column"
import {
    selectStatus, selectStatusOrder, selectIssues, selectNoneFilter,
    selectFilterByEpic, selectFilterByLabel, selectFilterByAssignee, selectGroupBy
} from "../../Components/Selectors"
import { v4 as uuidv4 } from 'uuid'

export const IssueCard = ({ task, openTaskDetail }) => (
    <div key={uuidv4()} className="epic-body">
        <p className="summary" onClick={() => openTaskDetail(task._id)}>{task.summary}</p>
        <div className="labels" onClick={() => openTaskDetail(task._id)}>{task.labels.length !== 0 && task.labels.map(each => <p key={uuidv4()} className="label">{each}</p>)}</div>
        <div className="issueType tab row" onClick={() => openTaskDetail(task._id)}>
            <div>
                <Tooltip title={task.issueType} aria-label={task.issueType}>
                    <CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} />
                </Tooltip>
                <p>{task.summary}</p>
            </div>
            <IssueDotIconMenu id={task._id} flag={task.flag}/>
            <Tooltip title={task.assignee} aria-label={task.assignee}><AccountCircleIcon onClick={() => openTaskDetail(task._id)} /></Tooltip>
        </div>
    </div>
)

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

export const useFilter = (listOfIssues) => {
    const noneFilter = useSelector(selectNoneFilter)
    const filterByEpic = useSelector(selectFilterByEpic)
    const filterByAssignee = useSelector(selectFilterByAssignee)
    const filterByLabel = useSelector(selectFilterByLabel)

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

    //----------Filters----------------------
    const groupBy = useSelector(selectGroupBy)
    //TODO

    const dispatch = useDispatch()

    //TODO onclick open modal


    const openTaskDetail = () => {
        setOpenModal(true)
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
                                {useFilter(el.issues).map((issueId, index) =>
                                    draggable(issues.get(issueId), index, openTaskDetail)
                                )}
                            </Column>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
        </div>
    );
}
