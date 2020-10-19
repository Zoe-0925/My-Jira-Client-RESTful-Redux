import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux"
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Column from "./Column"
import {
    selectStatus, selectStatusOrder, selectTasks, selectNoneFilter, selectCurrentProject,
    selectFilterByEpic, selectFilterByLabel, selectFilterByAssignee, selectGroupBy
} from "../../Reducers/Selectors"
import IssueModal from "../Issues/IssueDetail"
import { useIssueDetailModal, useCreateStatus } from "./CustomHooks"
import IssueCard from "./Card"


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

export default function DragAndDrop() {
    const columnOrder = useSelector(selectStatusOrder) // droppableId = the index of each column in order
    const status = useSelector(selectStatus)
    const columns = columnOrder.map(each => status.get(each))
    const tasks = useSelector(selectTasks)
    //  const { createNewColumn } = useCreateStatus(initialStatus._id)
    const [showNewEditable, setShowEditable] = useState(false)
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

    const { openModal, setOpenModal, issueDetailOpened, openTaskDetail } = useIssueDetailModal()
    //Add column:
    // dispatch(createSuccessfulStatus(statusName))
    //Delete column: 
    // dispatch(deleteSuccessfulStatus(statusId))

    /**
     *     {filterByEpic !== "" && el.issues.filter(item => { item.parent === filterByEpic }).map((issueId, index) =>
                                    draggable(issues.get(issueId), index, openTaskDetail)
                                )}
                                {filterByLabel !== "" && el.issues.filter(item => { item.label === filterByLabel }).map((issueId, index) =>
                                    draggable(issues.get(issueId), index, openTaskDetail)
                                )}
                                {filterByAssignee && el.issues.filter(item => { item.filterByAssignee === filterByAssignee }).map((issueId, index) =>
                                    draggable(issues.get(issueId), index, openTaskDetail)
                                )}
     */

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
                                {noneFilter && el.issues.map((issueId, index) =>{
                                   return draggable(tasks.get(issueId), index, openTaskDetail)
                                })}
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
            {openModal && <IssueModal open={openModal} closeModal={() => setOpenModal(false)} issue={issueDetailOpened} />}
        </div>
    );
}
