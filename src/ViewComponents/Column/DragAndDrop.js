import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux"
import { createSuccessfulStatus, deleteSuccessfulStatus } from "../../Components/Status/Actions"
import { createSuccessfulIssue, deleteSuccessfulIssue } from "../../Components/Issue/Actions"

function IssueCard({ task, openTaskDetail }) {
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

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

export default function DragAndDrop() {
    const dispatch = useDispatch()

    const statusReducer = useSelector(state.StatusReducer)
    const issueReducer = useSelector(state.IssueReducer)
    const columnOrder = statusReducer.statusOrder  // droppableId = the index of each column in order
    const status = statusReducer.status
    const getIssueOrder = (statusId) => {
        status.get(statusId).issues
    }
    const issues = issueReducer.issues

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

    //Accept a list of tasks, which is the value part of the key/value pair in the issue list
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    //I see......
    //Should I include the key here???
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};

        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    function onDragEnd(result) {
        const { source, destination } = result;
        //TODO need to understand how the source and destination are decided here

        // dropped outside the list
        if (!destination) {
            return;
        }

        //TODO droppableId = statusId
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            //TODO: The good practice would be to move the implementation detail to the reducer...
            // move the reorder to the util


            //Reorder a list of issue ids
            const items = reorder(status.get(columnOrder[sInd]).issues, source.index, destination.index);
            //Update the satus reducer
            //TODO
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            //If I need to change the array to map, 
            //Need to update here

            // source = an issueId list from a status
            // destination = another issueId list from a status

            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }
    }

    function openTaskDetail(issue) {
        //Pop the issue into the modal
        // dispatch an action to get all comments for the issue
        // Pop the comments to the issue modal 
    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                {columnOrder.map((el, ind) => (
                    <Droppable key={ind} droppableId={`${ind}`}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {el.map(each => {
                                    getIssueOrder(each).map((item, index) => (
                                        <Draggable
                                            key={item._id}
                                            draggableId={item._id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div>
                                                        {issues.get(item).map(each => <IssueCard task={each} openTaskDetail={() => { openTaskDetail(each) }} />)}
                                                    </div>
                                                </div>)}
                                        </Draggable>))
                                })
                                }
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </div>
    );
}
