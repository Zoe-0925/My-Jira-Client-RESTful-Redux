import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux"
import {
    createSuccessfulStatus, deleteSuccessfulStatus,
} from "../../Components/Status/Actions"
import { createSuccessfulIssue, deleteSuccessfulIssue } from "../../Components/Issue/Actions"
import { Tooltip } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Column from "./Column"
import {
    selectEpics, selectIssueArray, selectStatus, selectStatusOrder,
    selectIssues, selectNoneFilter,
    selectFilterByEpic, selectFilterByLabel, selectFilterByAssignee, selectGroupBy
} from "../../Components/Selectors"
import { v4 as uuidv4 } from 'uuid'

export const IssueCard = ({ task }) => (
    <div key={uuidv4()} className="epic-body" onClick={() => openTaskDetail(task._id)}>
        <p className="summary">{task.summary}</p>
        <div className="labels">{task.labels.length !== 0 && task.labels.map(each => <p key={uuidv4()} className="label">{each}</p>)}</div>
        <div className="issueType tab row">
            <div>
                <Tooltip title={task.issueType} aria-label={task.issueType}>
                    <CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} />
                </Tooltip>
                <p>{task.summary}</p>
            </div>
            <Tooltip title={task.assignee} aria-label={task.assignee}><AccountCircleIcon /></Tooltip>
        </div>
    </div>
)

export default function DragAndDrop() {
    const columnOrder = useSelector(selectStatusOrder) // droppableId = the index of each column in order
    const status = useSelector(selectStatus)
    const columns = columnOrder.map(each => status.get(each))
    const issues = useSelector(selectIssues)

    //----------Filters----------------------
    const noneFilter = useSelector(selectNoneFilter)
    const filterByEpic = useSelector(selectFilterByEpic)
    const filterByAssignee = useSelector(selectFilterByAssignee)
    const filterByLabel = useSelector(selectFilterByLabel)
    //TODO
    const groupBy = useSelector(selectGroupBy)

    const dispatch = useDispatch()



    //Add issue: 
    //Thunk: dispatch(createIssue(data))
    //Update issue:
    //Thunk: dispatch(updateIssue(data))
    //Delete issue:
    //dispatch(deleteSuccessfulIssue(id))

    //Add column:
    // dispatch(createSuccessfulStatus(statusName))
    //Delete column: 
    // dispatch(deleteSuccessfulStatus(statusId))

    const draggable = (task, index) => <Draggable
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
                <IssueCard task={task} />
            </div>)}
    </Draggable>

    const filter = listOfIssues => noneFilter ? listOfIssues
        : filterByEpic !== "" ? listOfIssues.filter(item => { item.parent !== filterByEpic })
            : filterByLabel !== "" ? listOfIssues.filter(item => { item.label !== filterByLabel })
                : filterByAssignee !== "" ? listOfIssues.filter(item => { item.filterByAssignee !== filterByAssignee }) : []

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
                                {filter(el.issues).map((issueId, index) =>
                                    draggable(issues.get(issueId), index)
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
