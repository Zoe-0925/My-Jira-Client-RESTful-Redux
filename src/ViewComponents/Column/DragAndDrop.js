import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux"
import {
    createSuccessfulStatus, deleteSuccessfulStatus, reorderIssues, moveIssues,
    updateIssueOrderRequest, moveIssuesRequest
} from "../../Components/Status/Actions"
import { createSuccessfulIssue, deleteSuccessfulIssue } from "../../Components/Issue/Actions"
import { Tooltip } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Column from "./Column"

export function IssueCard({ task, openTaskDetail }) {
    const labelsFormatted = task === undefined || task.labels.length === 0 ? "" :
        task.labels.map(each => <p className="label">{each}</p>)

    if (task.issueType === undefined || task.summary === undefined) { return <div></div> }

    return (
        <div className="epic-body" onClick={() => openTaskDetail(task._id)}>
            <p className="summary">{task.summary}</p>
            <div className="labels">{labelsFormatted}</div>
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
}

export default function DragAndDrop() {
    const statusReducer = useSelector(state => state.StatusReducer)
    const issueReducer = useSelector(state => state.IssueReducer)
    const columnOrder = statusReducer.statusOrder  // droppableId = the index of each column in order
    const status = statusReducer.status
    const issues = issueReducer.issues
    const columns = columnOrder.map(each => status.get(each))

    const initialReorder = { source: "", startIndex: "", endIndex: "" }
    const initialMove = { sourceIndex: "", destinationIndex: "", startIndex: "", endIndex: "" }

    const [reorderIssue, setReorderIssue] = useState(initialReorder)
    const [moveIssue, setMoveIssue] = useState(initialMove)

    //----------Filters----------------------
    const [filterByEpic, setEpic] = useState("")
    const [filterByAssignee, setAssigneeFilter] = useState("")
    const [groupByAssignee, setAssigneeGroup] = useState(false)
    const [groupByEpic, setEpicGroup] = useState(false)
    const [groupBySubtask, setSubtaskGroup] = useState(false)


    const dispatch = useDispatch()

    //TODO
    //Do I need to return a clean up function and clean the state???
    useEffect(() => {
        if (reorderIssue.source === "") { return }
        dispatch(reorderIssues(reorderIssue.source, reorderIssue.startIndex, reorderIssue.endIndex))
        //API request:
        // dispatch(updateIssueOrderRequest(reorderIssue.id, reorderIssue.startIndex, reorderIssue.endIndex))
    }, [reorderIssue])

    useEffect(() => {
        if (moveIssue.sourceIndex === "") { return }
        dispatch(moveIssues(moveIssue.sourceIndex, moveIssue.destinationIndex, moveIssue.startIndex, moveIssue.endIndex))
        //API request:
        //  dispatch(moveIssuesRequest(moveIssue.sourceIndex, moveIssue.destinationIndex, moveIssue.startIndex, moveIssue.endIndex))
    }, [moveIssue])

    const addColumn = (statusName) => {
        dispatch(createSuccessfulStatus(statusName))
        //TODO update this in reducer
    }

    const deleteColumn = (statusId) => {
        dispatch(deleteSuccessfulStatus(statusId))
        //TODO update this in reducer
    }

    const addItem = (task) => {
        dispatch(createSuccessfulIssue(task))
        //TODO update this in reducer
    }

    const deleteItem = (taskId) => {
        dispatch(deleteSuccessfulIssue(taskId))
        //TODO update this in reducer
    }

    function onDragEnd(result) {
        const { source, destination } = result;

        if (!destination) { // dropped outside the list
            return;
        }

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) { //Reorder a list of issue ids
            setReorderIssue({
                source: sInd, startIndex: source.index, endIndex: destination.index
            })
        } else {
            setMoveIssue({ sourceIndex: sInd, destinationIndex: dInd, startIndex: source.index, endIndex: destination.index })
        }
    }

    function openTaskDetail(issue) {
        //Pop the issue into the modal
        // dispatch an action to get all comments for the issue
        // Pop the comments to the issue modal 
    }

    return (
        <div className="epic-list">
            <DragDropContext onDragEnd={onDragEnd}>
                {columns.map((el, ind) => (
                    <Droppable key={ind} droppableId={`${ind}`}>
                        {(provided, snapshot) => (
                            <div
                                className={snapshot.isDraggingOver ? "column drag-over" : "epic-list"}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <Column initialStatus={el}>
                                    {el.issues.length > 0 ?
                                        el.issues.map((issueId, index) => (
                                            <Draggable
                                                className="draggable"
                                                key={issueId}
                                                draggableId={issueId}
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
                                                        <div>
                                                            <IssueCard task={issues.get(issueId)} openTaskDetail={() => { openTaskDetail(issueId) }} />
                                                        </div>
                                                    </div>)}
                                            </Draggable>))
                                        : ""
                                    }
                                </Column>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </div>
    );
}
